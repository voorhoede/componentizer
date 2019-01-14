import * as React from 'react';
import styled from '../styled-components';
import Button from './styled-components/Button';
import ModalFooter from './styled-components/ModalFooter';
import Warning from './styled-components/Warning';
import Modal from './Modal';
import TrelloProjectList from './TrelloProjectList';
import Error from './styled-components/Error';
import { Region } from './ImageEditor';
import { CloudinaryImage } from './ImageUploader';
import ErrorBoundary from 'react-error-boundary';
import { addCards } from '../lib/trello';
import generateComponentImageUrl from '../lib/generateComponentImageUrl';

interface TrelloExportButtonProps {
  regions: Region[]
  imgData: CloudinaryImage
  [propName: string]: {}
}

const onBoardSelect = async (boardId: string, regions: Region[], imgData: CloudinaryImage, setModalOpen: Function) => {
  const cards = regions.map(region => generateComponentImageUrl(region, imgData))

  await addCards(boardId, cards);

  setModalOpen(false);
}

const TrelloExportButton = ({ regions, imgData, ...props }: TrelloExportButtonProps) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setModalOpen(true)} {...props}>
        Export{modalOpen && 'ing'} to Trello  <span className="icon">🚀</span>
      </Button>
      <Modal show={modalOpen}>
        <Warning>ℹ️ The cards will be added to the first list of the board.</Warning>
        
        <ErrorBoundary FallbackComponent={() => <Error>🤔 Something went wrong fetching the data.</Error>}>
          <TrelloProjectList
            onBoardSelect={(boardId: string) => onBoardSelect(boardId, regions, imgData, setModalOpen)}
          />
        </ErrorBoundary>

        <ModalFooter>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
};

export default TrelloExportButton