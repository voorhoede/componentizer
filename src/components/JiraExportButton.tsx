import * as React from 'react';
import Button from './styled-components/Button';
import { getProjects } from '../lib/jira'

const auth = async () => {
  const projects = await getProjects()
}

const JiraExportButton = () => (
  <Button onClick={auth}>Export to Jira <span className="icon">🚀</span></Button>
)

export default JiraExportButton

