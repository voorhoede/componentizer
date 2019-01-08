import * as React from 'react';
import styled from '../styled-components';
import Button from './styled-components/Button';
import ModalFooter from './styled-components/ModalFooter';
import Modal from './Modal';
import BoardList from './BoardList';
import Error from './styled-components/Error';
import { Region } from './ImageEditor';
import ErrorBoundary from 'react-error-boundary';
import { addCards } from '../lib/trello';
import { CloudinaryImage } from './ImageUploader';

interface ExportButtonProps {
  regions: Region[]
  imgData: CloudinaryImage
}

const StyledExportButton = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
`;

const Warning = styled.p`
  display: block;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`;

const getPercentage = (value: number) => {
  return value / 100
}

const ExportButton: React.SFC<ExportButtonProps> = ({ regions, imgData }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [boardListKey, setBoardListKey] = React.useState(0)

  async function onBoardSelect(boardId: string) {
    const { width, height, public_id } = imgData;

    const cards = regions.map(region => {
      const widthInPx = Math.round(width * getPercentage(region.width));
      const heightInPx = Math.round(height * getPercentage(region.height));
      const xInPx = Math.round((region.x + region.width * 0.5) * (width / 100));
      const yInPx = Math.round((region.y + region.height * 0.5) * (height / 100));

      const croppedImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD!}/w_${widthInPx},h_${heightInPx},c_crop,g_xy_center,x_${xInPx},y_${yInPx},f_auto/${public_id}`

      return {
        ...region.data,
        attachments: [{ url: croppedImage }]
      }
    })

    await addCards(boardId, cards);

    setModalOpen(false);
  }

  return (
    <>
      <StyledExportButton
        onClick={() => setModalOpen(true)}
      >
        Export{modalOpen && 'ing'} to Trello  <span className="icon">🚀</span>
      </StyledExportButton>
      <Modal show={modalOpen}>
        <Warning>🚧 Beware! When exporting your components, they can not be edited later on. When exporting once more there will be duplicates.</Warning>
        <Warning>ℹ️ The cards will be added to the first list of the board.</Warning>
        
        <ErrorBoundary FallbackComponent={() => <Error>🤔 Something went wrong fetching the data.</Error>}>
          <React.Suspense fallback={<p>Loading <span>⌛️</span></p>}>
            <BoardList
              onBoardSelect={onBoardSelect}
              key={boardListKey}
            />
          </React.Suspense>
        </ErrorBoundary>

        <ModalFooter>
          <Button
            onClick={() => setModalOpen(false)}
          >Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
};

export default ExportButton