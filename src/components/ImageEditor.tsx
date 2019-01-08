import * as React from 'react'
const ReactRegionSelect = require('react-region-select');
import styled from '../styled-components'
import Modal from "./Modal";
import ComponentForm from "./ComponentForm";
const TrelloExportButton = React.lazy(() => import('./TrelloExportButton'))
const ImageExportButton = React.lazy(() => import('./ImageExportButton'))
import { CloudinaryImage } from './ImageUploader'

interface ImageEditorProps {
  imgData: CloudinaryImage
}

interface RegionData {
  index: number
  name?: string
  description?: string
}

export interface Region {
  data: RegionData
  isChanging: boolean
  new: boolean
  width: number
  height: number
  x: number
  y: number
}

interface RegionOptionsProps {
  data: RegionData
  isChanging: boolean
  onEditClick: Function
  onDeleteClick: Function
}

const StyledImageEditor = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    background-color: #f1f0ef;
    cursor: crosshair;
  }
`;

const StyledRegionOptions = styled.div`
  cursor: default;
  pointer-events: none;
  text-align: left;
  background-color: #fff;
  display: flex;
`;

const NameLabel = styled.p`
  padding: 0.25rem;
  flex: 1;
`

const Actions = styled.div`
  margin-left: auto;
`

const Action = styled.button`
  display: inline-block;
  padding: 0.25rem;
  pointer-events: all;
  background-color: transparent;
  border: none;
`

const ExportButtons = styled.div`
  position: fixed;
  right: 1rem;
  top: 1rem;

  > button {
    margin-left: 1rem;
  }
`

const RegionOptions: React.SFC<RegionOptionsProps> = ({ data, isChanging, onEditClick, onDeleteClick }) => (
  <StyledRegionOptions>
    {!isChanging && data.name && (
      <>
        <NameLabel>{data.name}</NameLabel>
        <Actions key={data.index}>
          <Action onClick={() => onDeleteClick(data.index)}>🗑</Action>
          <Action onClick={() => onEditClick(data.index)}>✏️</Action>
        </Actions>
      </>
    )}
  </StyledRegionOptions>
);

const ImageEditor: React.SFC<ImageEditorProps> = ({ imgData }) => {
  const [regions, updateRegions] = React.useState([].map((item: Region) => item));
  const [modalState, updateModalState] = React.useState({ show: false, index: 0 });

  const onRegionEdit = (index: number) => {
    updateModalState({
      show: true,
      index
    })
  }

  const onRegionDelete = (index: number) => {
    updateRegions(regions.filter(region => {
      return region.data.index !== index
    }))
  }

  return (
    <>
      <Modal show={modalState.show}>
        <ComponentForm
          region={regions.find((region: Region) => region.data.index === modalState.index)}
          onSubmit={(regionData: RegionData) => {
            updateRegions(regions.map((region: Region) => {
              if (region.data.index === regionData.index) {
                region.data = regionData
              }
              return region
            }));

            updateModalState({ index: 0, show: false })
          }}
          onCancel={(regionIndex: number) => {
            const region = regions.find((region: Region) => region.data.index === regionIndex)

            if (region && !region.data.name) {
              updateRegions(regions.filter(region => region.data.index !== regionIndex));
            }

            updateModalState({ index: 0, show: false })
          }}
        />
      </Modal>

      <StyledImageEditor>
        <ReactRegionSelect
          style={{ maxWidth: '80%' }}
          regions={regions}
          onChange={(regions: []) => {
            updateRegions(prevRegions => {
              prevRegions.forEach((prevRegion: Region) => {
                const updatedRegion: Region | undefined = regions.find((region: Region)=> region.data.index === prevRegion.data.index);

                if (prevRegion.new !== updatedRegion!.new) {
                  updateModalState({
                    show: true,
                    index: prevRegion.data.index
                  })
                }
              });

              return regions
            })
          }}
          regionRenderer={(props: RegionOptionsProps) => 
            <RegionOptions
              onEditClick={onRegionEdit}
              onDeleteClick={onRegionDelete}
              {...props}
            />
          }
        >
          <img src={imgData.secure_url} alt=""/>
        </ReactRegionSelect>
      </StyledImageEditor>

      <ExportButtons>
        <React.Suspense fallback={null}>
          <ImageExportButton regions={regions} imgData={imgData} />
        </React.Suspense>
        <React.Suspense fallback={null}>
          <TrelloExportButton regions={regions} imgData={imgData} />
        </React.Suspense>
      </ExportButtons>
    </>
  )
};

export default ImageEditor