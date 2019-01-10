import * as React from 'react'
const ReactRegionSelect = require('react-region-select');
import styled from '../styled-components'
import Modal from "./Modal";
import ComponentForm from "./ComponentForm";
import RegionOptions, { RegionOptionsProps } from './RegionOptions'
const TrelloExportButton = React.lazy(() => import('./TrelloExportButton'))
const ImageExportButton = React.lazy(() => import('./ImageExportButton'))
import { CloudinaryImage } from './ImageUploader'

interface ImageEditorProps {
  imgData: CloudinaryImage
}

export interface RegionData {
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

const ExportButtons = styled.div`
  position: fixed;
  right: 1rem;
  top: 1rem;

  > button {
    margin-left: 1rem;
  }
`

const onRegionChange = (regions: Region[], updateRegions: Function, updateModalState: Function) => {
  updateRegions((prevRegions: Region[]) => {
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
}

const onComponentFormSubmit = (regionData: RegionData, regions: Region[], updateRegions: Function, updateModalState: Function) => {
  updateRegions(regions.map((region: Region) => {
    if (region.data.index === regionData.index) {
      region.data = regionData
    }
    return region
  }));

  updateModalState({ index: 0, show: false })
}

const onComponentFormCancel = (regions: Region[], regionIndex: number, updateRegions: Function, updateModalState: Function) => {
  const region = regions.find((region: Region) => region.data.index === regionIndex)

  if (region && !region.data.name) {
    updateRegions(regions.filter(region => region.data.index !== regionIndex));
  }

  updateModalState({ index: 0, show: false })
}

const ImageEditor = ({ imgData }: ImageEditorProps) => {
  const [regions, updateRegions] = React.useState<Region[]>([]);
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

  const names = regions.reduce<string[]>((acc, region) => {
    if (region.data.name) {
      acc.push(region.data.name)
    }

    return acc
  }, [])

  return (
    <>
      <Modal show={modalState.show}>
        <ComponentForm
          region={regions.find((region: Region) => region.data.index === modalState.index)}
          onSubmit={(regionData: RegionData) => onComponentFormSubmit(regionData, regions, updateRegions, updateModalState)}
          onCancel={(regionIndex: number) => onComponentFormCancel(regions, regionIndex, updateRegions, updateModalState)}
          names={names}
        />
      </Modal>

      <StyledImageEditor>
        <ReactRegionSelect
          style={{ maxWidth: '80%' }}
          regions={regions}
          onChange={(regions: Region[]) => onRegionChange(regions, updateRegions, updateModalState)}
          regionRenderer={(props: RegionOptionsProps) => (
            <RegionOptions onEditClick={onRegionEdit} onDeleteClick={onRegionDelete} {...props} />
          )}
        >
          <img src={imgData.secure_url} alt=""/>
        </ReactRegionSelect>
      </StyledImageEditor>

      <ExportButtons>
        <React.Suspense fallback={null}>
          <ImageExportButton disabled={!regions.length} regions={regions} imgData={imgData} />
        </React.Suspense>
        <React.Suspense fallback={null}>
          <TrelloExportButton disabled={!regions.length} regions={regions} imgData={imgData} />
        </React.Suspense>
      </ExportButtons>
    </>
  )
};

export default ImageEditor