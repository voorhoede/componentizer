import * as React from 'react'
import styled from '../styled-components';
import Button from './styled-components/Button';

type Brightness = 'dark' | 'light'

interface ProjectPrefs {
  backgroundBottomColor: string
  backgroundBrightness: Brightness
}

interface Project {
  id: string
  name: string
  prefs?: ProjectPrefs
}

interface ProjectProps {
  background?: string
  backgroundBrightness?: Brightness
}

interface ProjectList {
  projects: Project[]
  onProjectSelect: Function
  loading: boolean
}

const StyledBoardList = styled.ul`
  list-style: none;
  margin-bottom: 1rem;

  li:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Board = styled(Button)<ProjectProps>`
  background: ${props => props.background};
  font-size: 1rem;
  color: ${props => props.backgroundBrightness === 'light' ? '#000' : '#fff'};

  .icon {
    margin-left: 0.5rem;
  }
`

const ProjectList = ({ projects, onProjectSelect, loading }: ProjectList) => {
  const [loadingId, setLoadingBoard] = React.useState<string | null>(null);

  return (
    <StyledBoardList>
      { !loading ? (
        projects.map((project: Project) => (
          <li key={project.id}>
            <Board
              background={project.prefs && project.prefs.backgroundBottomColor}
              backgroundBrightness={project.prefs && project.prefs.backgroundBrightness}
              disabled={Boolean(loadingId)}
              onClick={async () => {
                setLoadingBoard(loadingId)
                await onProjectSelect(project.id)
                setLoadingBoard(null)
              }}
            >{project.name}{loadingId === project.id && <span className="icon">⏳</span>}</Board>
          </li>
        ))

      ): <p>Loading <span>⌛️</span></p>}
    </StyledBoardList>
  )
}

export default ProjectList