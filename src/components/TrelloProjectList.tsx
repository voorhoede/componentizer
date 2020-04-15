import * as React from 'react'
import { getBoards } from '../lib/trello'
import ProjectList from './ProjectList'

interface TrelloProjectListProps {
  onBoardSelect: Function
}

const TrelloProjectList = ({ onBoardSelect }: TrelloProjectListProps) => {
  const [boards, setBoards] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)

    getBoards().then((boards) => {
      setBoards(boards)
      setLoading(false)
    })
  }, [])

  return (
    <ProjectList
      projects={boards}
      onProjectSelect={onBoardSelect}
      loading={loading}
    />
  )
}

export default TrelloProjectList
