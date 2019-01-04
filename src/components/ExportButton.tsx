import * as React from 'react'
import styled from '../styled-components'
import Button from './styled-components/Button'
import Modal from './Modal';
import BoardList from './BoardList'

interface ExportButtonProps {
  regions: object[]
}

const StyledExportButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ExportButton: React.SFC<ExportButtonProps> = ({ regions }) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      { String(modalOpen) }
      <Modal show={modalOpen}>
        <BoardList
          onBoardSelect={(id: string) => {
            setModalOpen(false)
            console.log(id)
          }}
        />
      </Modal>
      <StyledExportButton
        onClick={() => setModalOpen(true)}
      >
        Export to Trello 🚀
      </StyledExportButton>
    </>
  )
};

export default ExportButton