import fetch from 'node-fetch'

export const handler = async (event, context, callback) => {
  const query = event.queryStringParameters
  const path = event.path.replace('/jira-proxy/', '')
  const url = `https://api.atlassian.com/ex/jira/${query.cloudId}/rest/api/2/${path}`;

  console.log(query)

  console.log('-------')
  console.log('')
  console.log('')
  console.log({
    method: event.httpMethod,
    ...(event.body && event.httpMethod !== 'GET' && { body: event.body }),
    headers: {
      Authorization: `Bearer ${query.token}`,
      'Content-Type': 'application/json'
    }
  })
  console.log('')
  console.log('')
  console.log('-------')

  fetch(url, {
    method: event.httpMethod,
    ...(event.body && event.httpMethod !== 'GET' && { body: event.body }),
    headers: {
      Authorization: `Bearer ${query.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      callback(null, {
        statusCode: 200,
        headers: {
          Content: 'application/json'
        },
        body: JSON.stringify(data)
      })
    })
    .catch(err => {
      console.log(err)
      callback(null, {
        statusCode: 400,
        body: err.message
      })
    })

  return;
}