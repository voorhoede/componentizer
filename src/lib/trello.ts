import authWindow from './authWindow'

interface Trello {
  authUrl: string
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
    const url = `${this.baseUrl}/member/me/boards?token=${this.token}&key=${this.key}`
    const res = await fetch(url)
    return res.json()
  }
}

const trello = new Trello()

export default trello