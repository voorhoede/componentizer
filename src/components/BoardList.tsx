import * as React from 'react';
import styled from '../styled-components';
import trello from '../lib/trello';
import Button from '../components/styled-components/Button'

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

  li:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const Board = styled(Button)<BoardProps>`
  background: ${props => props.background};
  font-size: 1rem;
  color: ${props => props.backgroundBrightness === 'dark' ? '#fff' : '#000'};
`

const BoardList: React.SFC<BoardListProps> = ({ onBoardSelect }) => {
  const [boards, setBoards] = React.useState<Board[]>([]);
  
  React.useEffect(() => {
    trello.getBoards()
      .then(boards => setBoards(boards))
  }, [])

  return (
    <StyledBoardList>
      {boards && (
        boards.map(board => (
          <li key={board.id}>
            <Board
              background={board.prefs.backgroundBottomColor}
              backgroundBrightness={board.prefs.backgroundBrightness}
              onClick={() => onBoardSelect(board.id)}
            >{board.name}</Board>
          </li>
        ))
      )}
    </StyledBoardList>
  )
};

export default BoardList