import * as React from 'react';
const { unstable_createResource } = require('react-cache')
import styled from '../styled-components';
import trello from '../lib/trello';
import Button from '../components/styled-components/Button'

const boardsResource = unstable_createResource(trello.getBoards)

type Brightness = 'dark' | 'light'

interface BoardListProps {
  onBoardSelect: Function
}

interface BoardPrefs {
  backgroundBottomColor: string
  backgroundBrightness: Brightness
}

interface BoardProps {
  background: string
  backgroundBrightness: Brightness
}

interface Board {
  id: string
  name: string
  prefs: BoardPrefs
}

const StyledBoardList = styled.ul`
  list-style: none;
  margin-bottom: 1rem;

  li:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const Board = styled(Button)<BoardProps>`
  background: ${props => props.background};
  font-size: 1rem;
  color: ${props => props.backgroundBrightness === 'dark' ? '#fff' : '#000'};

  .icon {
    margin-left: 0.5rem;
  }
`

const BoardList: React.SFC<BoardListProps> = ({ onBoardSelect }) => {
  // const [boards, setBoards] = React.useState<Board[]>([]);
  const [loadingBoard, setLoadingBoard] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    trello.authorize()
  }, [])

  const boards = boardsResource.read()

  return (
    <StyledBoardList>
      {
        boards.map((board: Board) => (
          <li key={board.id}>
            <Board
              background={board.prefs.backgroundBottomColor}
              backgroundBrightness={board.prefs.backgroundBrightness}
              onClick={async () => {
                setLoadingBoard(board.id)
                await onBoardSelect(board.id)
                setLoadingBoard(null)
              }}
            >{board.name}{loadingBoard === board.id && <span className="icon">⏳</span>}</Board>
          </li>
        ))
      }
    </StyledBoardList>
  )
};

export default BoardList