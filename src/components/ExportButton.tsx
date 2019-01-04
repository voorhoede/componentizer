import * as React from 'react'
import styled from '../styled-components'
import Button from './styled-components/Button'
import ModalFooter from './styled-components/ModalFooter'
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
      <Modal show={modalOpen}>
        <BoardList
          onBoardSelect={(id: string) => {
            setModalOpen(false)


          }}
        />

        <ModalFooter>
          <Button
            onClick={() => setModalOpen(false)}
          >Cancel</Button>
        </ModalFooter>
      </Modal>
      <StyledExportButton
        onClick={() => setModalOpen(true)}
      >
        Export{modalOpen && 'ing'} to Trello 🚀
      </StyledExportButton>
    </>
  )
};

export default ExportButton