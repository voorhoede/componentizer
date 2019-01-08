import authWindow from './authWindow'
import queryString from 'query-string'
import mergeComponents from './mergeComponents'

const baseUrl = 'https://trello.com/1';
const key = process.env.REACT_APP_TRELLO_KEY;

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

  const url = `${baseUrl}/authorize?key=${process.env.REACT_APP_TRELLO_KEY}&scope=read,write&name=Ticket maker&callback_method=postMessage&response_type=fragment&return_url=${window.location.href}`;
  const token = await authWindow(url);

  localStorage.setItem('trello_token', token)
}

export async function getBoards () {
  authorize()
  const token = localStorage.getItem('trello_token');
  const query = queryString.stringify({ token, key: process.env.REACT_APP_TRELLO_KEY });
    return fetch(`${baseUrl}/member/me/boards?${query}`)
      .then(res => res.json())
}

export async function addCards (boardId: string, cards: RegionComponent[]) {
  authorize()
  const token = localStorage.getItem('trello_token');
  const listsQuery = queryString.stringify({ token, key })
  const lists = await fetch(`${baseUrl}/boards/${boardId}/lists?${listsQuery}`).then(res => res.json())

  let list: { id?: string } = {};

  if (!lists.length) {
    const listQuery = queryString.stringify({
      token,
      key,
      idBoard: boardId,
      name: 'To do',
    })

    list = await fetch(`${baseUrl}/lists?${listQuery}`, { method: 'POST' }).then(res => res.json())
  } else {
    list = lists[0]
  }

  // merge cards with the same name
  const mergedCards = mergeComponents(cards);

  return Promise.all(mergedCards.map(async card => {
    const cardQuery = queryString.stringify({
      token,
      key,
      idList: list.id,
      name: card.name,
      desc: card.description
    })

    const url = `${baseUrl}/cards?${cardQuery}`  

    const { id }: { id: string } = await fetch(url, { method: 'POST' }).then(res => res.json())

    return Promise.all(card.attachments.map(attachment => {
      const attachmentQuery = queryString.stringify({
        token,
        key,
        url: attachment.url,
        name: card.name
      })
  
      const attachmentUrl = `${baseUrl}/cards/${id}/attachments?${attachmentQuery}`

      return fetch(attachmentUrl, { method: 'POST' }).then(res => res.json())
    }))
  }))
}
