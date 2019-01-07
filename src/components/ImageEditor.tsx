import * as React from 'react'
const ReactRegionSelect = require('react-region-select');
import styled from '../styled-components'
import Modal from "./Modal";
import ComponentForm from "./ComponentForm";
import ExportButton from './ExportButton'
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

const StyledImageEditor = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-height: 100vh;
    max-width: 100vw;
    background-color: #f1f0ef;
    cursor: crosshair;
  }
`;

const StyledRegionOptions = styled.div`
  cursor: default;
  pointer-events: none;
`;

const StyledNameLabel = styled.p`
  background-color: #fff;
  padding: 0.25rem;
`;

const RegionOptions: React.SFC<{data: RegionData, isChanging: boolean}> = ({ data, isChanging }) => (
  <StyledRegionOptions>
    {!isChanging && data.name && <StyledNameLabel>{data.name}</StyledNameLabel>}
  </StyledRegionOptions>
);

const ImageEditor: React.SFC<ImageEditorProps> = ({ imgData }) => {
  const [regions, updateRegions] = React.useState([].map((item: Region) => item));
  const [modalState, updateModalState] = React.useState({ show: false, index: 0 });

  return (
    <>
      <Modal show={modalState.show}>
        <ComponentForm
          regionIndex={modalState.index}
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
            updateRegions(regions.filter(region => region.data.index !== regionIndex));
            updateModalState({ index: 0, show: false })
          }}
        />
      </Modal>

      <StyledImageEditor>
        <ReactRegionSelect
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
          regionRenderer={RegionOptions}
        >
          <img src={imgData.secure_url} alt=""/>
        </ReactRegionSelect>
      </StyledImageEditor>

      <ExportButton regions={regions} imgData={imgData} />
    </>
  )
};

export default ImageEditor