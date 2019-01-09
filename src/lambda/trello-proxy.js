import got from 'got'
import queryString from 'query-string'
import dotenv from 'dotenv'

dotenv.config()

const key = process.env.TRELLO_KEY;
const baseUrl = 'https://trello.com/1';

export const handler = async (event, context, callback) => {
  const path = event.path
    .replace('.netlify/functions/', '')
    .replace('/trello-proxy', '')
  const query = { ...event.queryStringParameters, key }
  const formattedQuery = queryString.stringify(query)
  const url = `${path}?${formattedQuery}`

  try {    
    const res = await got({ method: event.httpMethod, url: `${baseUrl}${url}` })
    const contentType = res.headers['content-type']
  
    if (contentType === 'text/html; charset=utf-8') {
      // for auth screens
      res.body = res.body
        .replace(/href="/g, 'href="https://trello.com')
        .replace(/\/images/g, 'https://trello.com/images')
    }
    
    callback(null, {
      statusCode: 200,
      body: res.body
    })
  } catch(err) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(err.statusMessage)
    })
  }

}