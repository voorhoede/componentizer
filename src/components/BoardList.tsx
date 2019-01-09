import * as React from 'react';
import styled from '../styled-components';
import { getBoards } from '../lib/trello';
import Button from '../components/styled-components/Button';

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
`;

const Board = styled(Button)<BoardProps>`
  background: ${props => props.background};
  font-size: 1rem;
  color: ${props => props.backgroundBrightness === 'dark' ? '#fff' : '#000'};

  .icon {
    margin-left: 0.5rem;
  }
`

const BoardList = ({ onBoardSelect }: BoardListProps) => {
  const [boards, setBoards] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [loadingBoard, setLoadingBoard] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true)
    
    getBoards()
      .then(boards => {
        console.log(boards)
        setBoards(boards)
        setLoading(false)
      })
  }, [])

  return (
    <StyledBoardList>
      { !loading ? (
        boards.map((board: Board) => (
          <li key={board.id}>
            <Board
              background={board.prefs.backgroundBottomColor}
              backgroundBrightness={board.prefs.backgroundBrightness}
              disabled={Boolean(loadingBoard)}
              onClick={async () => {
                setLoadingBoard(board.id)
                await onBoardSelect(board.id)
                setLoadingBoard(null)
              }}
            >{board.name}{loadingBoard === board.id && <span className="icon">⏳</span>}</Board>
          </li>
        ))
      ) : (
        <p>Loading <span>⌛️</span></p>
      )}
    </StyledBoardList>
  )
};

export default BoardList