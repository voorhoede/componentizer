import * as React from 'react'
import { getProjects } from '../lib/jira'
import ProjectList from './ProjectList';

const JiraProjectList = () => {
  const [projects, setProjects] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    
    getProjects()
      .then(projects => {
        setProjects(projects)
        setLoading(false)
      })
  }, [])

  return (
    <ProjectList
      projects={projects}
      loading={loading}
      onProjectSelect={(id: string) => console.log(id)}
    />
  )
}

export default JiraProjectList