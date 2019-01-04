import authWindow from './authWindow'
import queryString from 'query-string'

interface Trello {
  authUrl: string
}

interface Attachment {
  url: string
}

export interface Card {
  name: string
  desc?: string
  attachments: Attachment[]
}

class Trello {
  private baseUrl = 'https://trello.com/1'
  private token: string | null = null
  private key = process.env.REACT_APP_TRELLO_KEY

  async authorize(): Promise<void> {
    if (this.token) return

    if (localStorage.getItem('trello_token')) {
      this.token = localStorage.getItem('trello_token')
      return
    }

    const url = `${this.baseUrl}/authorize?key=${process.env.REACT_APP_TRELLO_KEY}&scope=read,write&name=Ticket maker&callback_method=postMessage&response_type=fragment&return_url=${window.location.href}`;
    const token = await authWindow(url);

    localStorage.setItem('trello_token', token)
    
    this.token = token
  }

  async getBoards() {
    await this.authorize()
    const query = queryString.stringify({ token: this.token, key: this.key })
    const res = await fetch(`${this.baseUrl}/member/me/boards?${query}`)
      .then(res => res.json())
    return res
  }

  async addCards(boardId: string, cards: Card[]) {
    await this.authorize()
    const listQuery = queryString.stringify({ token: this.token, key: this.key })
    const lists = await fetch(`${this.baseUrl}/boards/${boardId}/lists?${listQuery}`).then(res => res.json())
    const list = lists[0]

    const createdCards =await Promise.all(cards.map(async card => {
      const cardQuery = queryString.stringify({
        token: this.token,
        key: this.key,
        idList: list.id,
        name: card.name
      })

      const url = `${this.baseUrl}/cards?${cardQuery}`  

      const { id }: { id: string } = await fetch(url, { method: 'POST' }).then(res => res.json())
    
      const attachmentQuery = queryString.stringify({
        token: this.token,
        key: this.key,
        url: card.attachments[0].url
      })

      const attachmentUrl = `${this.baseUrl}/cards/${id}/attachments?${attachmentQuery}`

      fetch(attachmentUrl, { method: 'POST', body: JSON.stringify(card.attachments[0]) }).then(res => res.json())
    }))

    return createdCards;
  }
}

const trello = new Trello()

export default trello