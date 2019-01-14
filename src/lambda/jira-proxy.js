import fetch from 'node-fetch'

export const handler = async (event, context, callback) => {
  const query = event.queryStringParameters
  const path = event.path.replace('/jira-proxy/', '')
  const url = `https://api.atlassian.com/ex/jira/${query.cloudId}/rest/api/3/${path}`;

  fetch(url, {
    headers: {
      Authorization: `Bearer ${query.token}`
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
      callback(null, {
        statusCode: 400,
        body: err.message
      })
    })

  return;
}