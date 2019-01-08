import got from 'got'
import queryString from 'query-string'

const key = process.env.REACT_APP_TRELLO_KEY;
const baseUrl = 'https://trello.com/1';

export const handler = function(event, context, callback) {
  const path = event.path.replace('/trello-proxy', '')
  const query = queryString.stringify(event.queryStringParameters)
  const url = `${path}?${query}`

  got({
    method: event.httpMethod,
    url: `${baseUrl}${url}`
  })
    .then(res => {
      console.log(typeof res.body)
      callback(null, {
        statusCode: 200,
        data: res.body,
        headers: { 'Content-Type': 'application/json' },
      })
    })
    .catch(err => {
      callback(null, {
        statusCode: 400,
        data: err,
        headers: { 'Content-Type': 'application/json' },
      })
    })
}