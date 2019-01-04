import * as React from 'react'
import styled from '../styled-components'
import Button from './styled-components/Button'
import trello from '../lib/trello'

interface ExportButtonProps {
  regions: object[]
}

const StyledExportButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ExportButton: React.SFC<ExportButtonProps> = ({ regions }) => {
  return (
    <StyledExportButton
      onClick={async () => {
        const boards = await trello.getBoards()
        console.log(boards)
      }}
    >
      Export to Trello 🚀
    </StyledExportButton>
  )
};

export default ExportButton