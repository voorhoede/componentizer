import authWindow from './authWindow'
import queryString from 'query-string'

const baseUrl = 'https://trello.com/1';
const key = process.env.REACT_APP_TRELLO_KEY;

interface Attachment {
  url: string
}

export interface Card {
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

export async function addCards (boardId: string, cards: Card[]) {
  authorize()
  const token = localStorage.getItem('trello_token');
  const listQuery = queryString.stringify({ token, key })
  const lists = await fetch(`${baseUrl}/boards/${boardId}/lists?${listQuery}`).then(res => res.json())
  const list = lists[0]

  return Promise.all(cards.map(async card => {
    const cardQuery = queryString.stringify({
      token,
      key,
      idList: list.id,
      name: card.name,
      desc: card.description
    })

    const url = `${baseUrl}/cards?${cardQuery}`  

    const { id }: { id: string } = await fetch(url, { method: 'POST' }).then(res => res.json())
  
    const attachmentQuery = queryString.stringify({
      token,
      key,
      url: card.attachments[0].url
    })

    const attachmentUrl = `${baseUrl}/cards/${id}/attachments?${attachmentQuery}`

    return fetch(attachmentUrl, { method: 'POST', body: JSON.stringify(card.attachments[0]) }).then(res => res.json())
  }))
}
