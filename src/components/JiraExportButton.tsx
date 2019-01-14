import * as React from 'react';
import JIRA from '@atlassian/jira';
import Button from './styled-components/Button';
import queryString from 'query-string'
import jiraAuthWindow from '../lib/jiraAuthWindow'

const authenticate = async () => {
  const query = queryString.stringify({
    audience: "api.atlassian.com",
    client_id: "DJuqS2cOdgio7LKsMdPSsdRdjdSQInpJ",
    prompt: "consent",
    redirect_uri: window.location.origin,
    callback_method: 'postMessage',
    response_type: "code",
    scope: "read:jira-user write:jira-work manage:jira-project read:jira-work",
    state: new Date(),
  });

  const url = `https://auth.atlassian.com/authorize?${query}`

  const token = await jiraAuthWindow(url)

  console.log(token)

  // localStorage.setItem('trello_token', token)
}

const JiraExportButton = () => (
  <Button onClick={authenticate}>Export to Jira <span className="icon">🚀</span></Button>
)

export default JiraExportButton

