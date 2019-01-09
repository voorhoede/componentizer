import authWindow from './authWindow'
import queryString from 'query-string'
import mergeComponents from './mergeComponents'

interface Attachment {
  url: string
}

export interface RegionComponent {
  name?: string
  description?: string
  attachments: Attachment[]
}

async function authorize () {
  if (localStorage.getItem('trello_token')) {
    return
  }

  const query = queryString.stringify({
    scope: 'read,write',
    name: 'Componentizer',
    callback_method: 'postMessage',
    response_type: 'fragment',
    return_url: window.location.href
  });

  const token = await authWindow(`.netlify/functions/trello-proxy/authorize?${query}`);

  localStorage.setItem('trello_token', token)
}

export async function getBoards () {
  await authorize()
  const token = localStorage.getItem('trello_token');
  const query = queryString.stringify({ token });
  return fetch(`.netlify/functions/trello-proxy/member/me/boards?${query}`)
    .then(res => res.json())
}

export async function addCards (boardId: string, cards: RegionComponent[]) {
  await authorize()
  const token = localStorage.getItem('trello_token');
  const listsQuery = queryString.stringify({ token, key })
  const lists = await fetch(`.netlify/functions/trello-proxy/boards/${boardId}/lists?${listsQuery}`).then(res => res.json())

  let list: { id?: string } = {};

  if (!lists.length) {
    const listQuery = queryString.stringify({
      token,
      idBoard: boardId,
      name: 'To do',
    })

    list = await fetch(`.netlify/functions/trello-proxy/lists?${listQuery}`, { method: 'POST' }).then(res => res.json())
  } else {
    list = lists[0]
  }

  // merge cards with the same name
  const mergedCards = mergeComponents(cards);

  return Promise.all(mergedCards.map(async card => {
    const cardQuery = queryString.stringify({
      token,
      idList: list.id,
      name: card.name,
      desc: card.description
    })

    const url = `.netlify/functions/trello-proxy/cards?${cardQuery}`  

    const { id }: { id: string } = await fetch(url, { method: 'POST' }).then(res => res.json())

    return Promise.all(card.attachments.map(attachment => {
      const attachmentQuery = queryString.stringify({
        token,
        url: attachment.url,
        name: card.name
      })

      const attachmentUrl = `.netlify/functions/trello-proxy/cards/${id}/attachments?${attachmentQuery}`

      return fetch(attachmentUrl, { method: 'POST' }).then(res => res.json())
    }))
  }))
}
