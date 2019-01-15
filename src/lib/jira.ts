import queryString from 'query-string'
import jiraAuthWindow from './jiraAuthWindow'
import getImageFiles from './getImageFiles'
import { RegionComponent } from './trello';

let jira_token: null | string = localStorage.getItem('jira_token')
let jira_cloudId: null | string = localStorage.getItem('jira_cloudId')

export async function authenticate () {
  if (!jira_token) {
    const query = queryString.stringify({
      audience: "api.atlassian.com",
      client_id: process.env.REACT_APP_JIRA_CLIENT_ID,
      prompt: "consent",
      redirect_uri: window.location.origin,
      callback_method: 'postMessage',
      response_type: 'code',
      oauth_expires_in: '157680000',
      scope: 'read:jira-user read:jira-work write:jira-work manage:jira-project manage:jira-configuration',
      state: new Date(),
    });
  
    const url = `https://auth.atlassian.com/authorize?${query}`
  
    const code = await jiraAuthWindow(url)
  
    const { access_token } = await fetch('.netlify/functions/jira-auth', {
      method: 'POST',
      body: JSON.stringify({
        code
      })
    }).then(res => res.json())
    
    jira_token = access_token
    localStorage.setItem('jira_token', access_token)
  }

  if (!jira_cloudId) {
    const clouds = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        Authorization: `Bearer ${jira_token}`
      }
    }).then(res => res.json())

    const { id } = clouds[0]

    jira_cloudId = id
    localStorage.setItem('jira_cloudId', id)
  }
}

export async function getProjects() {
  await authenticate()

  const query = queryString.stringify({
    token: jira_token,
    cloudId: jira_cloudId
  })

  return fetch(`.netlify/functions/jira-proxy/project?${query}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export async function addIssues (issues: RegionComponent[], projectId: string) {
  await authenticate()

  const query = queryString.stringify({
    token: jira_token,
    cloudId: jira_cloudId
  })

  const createdIssues = await fetch(`.netlify/functions/jira-proxy/issue/bulk?${query}`, {
    method: 'POST',
    body: JSON.stringify({
      issueUpdates: issues.map(issue => ({
        fields: {
          summary: issue.name,
          description: issue.description,
          project: {
            key: projectId
          },
          issuetype: {
            name: 'Story'
          }
        },
      }))
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err))

    
  const files = await getImageFiles(issues)

  const formData = new FormData()

  files.forEach(file => {
    file.images.forEach(image => {
      formData.append(`${file.name}[]` || 'image[]', image)
    })
  })

  createdIssues.issues.forEach((issue: { id: string }, index: number) => {
    fetch(`.netlify/functions/jira-proxy/issue/${issue.id}/attachments?${query}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => {
        console.log(err)
      })
  })
}