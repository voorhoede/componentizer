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

const getPercentage = (value: number) => {
  return value / 100
}

const ExportButton: React.SFC<ExportButtonProps> = ({ regions, imgData }) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      <Modal show={modalOpen}>
        <BoardList
          onBoardSelect={(boardId: string) => {
            setModalOpen(false);

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

            trello.addCards(boardId, cards)
          }}
        />
        <ModalFooter>
          <Button
            onClick={() => setModalOpen(false)}
          >Cancel</Button>
        </ModalFooter>
      </Modal>
      <StyledExportButton
        onClick={() => {
          setModalOpen(true)
        }}
      >
        Export{modalOpen && 'ing'} to Trello 🚀
      </StyledExportButton>
    </>
  )
};

export default ExportButton