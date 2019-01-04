import * as React from 'react'
import styled from '../styled-components'
import Button from './styled-components/Button'
import ModalFooter from './styled-components/ModalFooter'
import Modal from './Modal';
import BoardList from './BoardList'
import { Region } from './ImageEditor'
import trello, { Card } from '../lib/trello';
import { CloudinaryImage } from './ImageUploader';

interface ExportButtonProps {
  regions: Region[]
  imgData: CloudinaryImage
}

const StyledExportButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Warning = styled.p`
  display: block;
  margin-bottom: 1.5rem;
`

const getPercentage = (value: number) => {
  return value / 100
}

const ExportButton: React.SFC<ExportButtonProps> = ({ regions, imgData }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [boardsLoaded, setBoardsLoaded] = React.useState(false)

  return (
    <>
      <StyledExportButton
        onClick={() => {
          setModalOpen(true)
        }}
      >
        Export{modalOpen && 'ing'} to Trello  <span className="icon">🚀</span>
      </StyledExportButton>
      <Modal show={modalOpen}>
        <Warning>🚧 Beware! When exporting your components, they can not be edited later on. When exporting once more there will be duplicates.</Warning>
        <BoardList
          onBoardSelect={async (boardId: string) => {
            const { width, height, public_id } = imgData;

            const cards = regions.map(region => {
              const widthInPx = Math.round(width * getPercentage(region.width));
              const heightInPx = Math.round(height * getPercentage(region.height));
              const xInPx = Math.round((region.x + region.width * 0.5) * (width / 100));
              const yInPx = Math.round((region.y + region.height * 0.5) * (height / 100));

              const croppedImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD!}/w_${widthInPx},h_${heightInPx},c_crop,g_xy_center,x_${xInPx},y_${yInPx},f_auto/${public_id}`

              return {
                name: region.data.name || '',
                attachments: [{ url: croppedImage }]
              }
            })

            await trello.addCards(boardId, cards);

            setModalOpen(false);
          }}
          onBoardsLoaded={() => setBoardsLoaded(true)}
        />
        {boardsLoaded && (
          <ModalFooter>
            <Button
              onClick={() => setModalOpen(false)}
            >Cancel</Button>
          </ModalFooter>
        )}
      </Modal>
    </>
  )
};

export default ExportButton