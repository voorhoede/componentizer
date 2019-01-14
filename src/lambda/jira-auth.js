import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

export const handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const { code } = data;

  if (!code) {
    callback(null, {
      statusCode: 400,
      body: "'code' is required"
    })
  }

  fetch('https://auth.atlassian.com/oauth/token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code,
      client_id: process.env.REACT_APP_JIRA_CLIENT_ID,
      client_secret: process.env.REACT_APP_JIRA_CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000',
      grant_type: 'authorization_code'
    })
  })
    .then(res => res.json())
    .then(data => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
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
}