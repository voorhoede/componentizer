import * as React from 'react'
const ReactRegionSelect = require('react-region-select');
import styled from '../styled-components'
import Modal from "./Modal";
import ComponentForm from "./ComponentForm";
import RegionOptions, { RegionOptionsProps } from './RegionOptions'
const TrelloExportButton = React.lazy(() => import('./TrelloExportButton'))
const JiraExportButton = React.lazy(() => import('./JiraExportButton'))
const ImageExportButton = React.lazy(() => import('./ImageExportButton'))
import { CloudinaryImage } from './ImageUploader'
import DropDown from './DropDown';
import Button from './styled-components/Button';

const maxRegionSize = 10

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

const onRegionChange = (regions: Region[], setRegions: Function, updateModalState: Function, imgData: CloudinaryImage) => {
  setRegions((prevRegions: Region[]) => {
    regions = regions
    .filter(region => {
        const prevRegionState: Region | undefined = prevRegions.find((prevRegion: Region)=> region.data.index === prevRegion.data.index);
        
        if (prevRegionState && !prevRegionState.new) { return true }

        const width = Math.round(region.width * (imgData.width / 100));
        const height = Math.round(region.height * (imgData.height / 100));

        return region.isChanging || (width > maxRegionSize && height > maxRegionSize);
      })

    prevRegions.forEach((prevRegion: Region) => {
      const nextRegionState: Region | undefined = regions.find((region: Region)=> region.data.index === prevRegion.data.index);

      if (nextRegionState && prevRegion.new !== nextRegionState.new) {
        updateModalState({
          show: true,
          index: prevRegion.data.index
        })
      }
    });

    return regions
  })
}

const onComponentFormSubmit = (regionData: RegionData, regions: Region[], setRegions: Function, updateModalState: Function) => {
  setRegions(regions.map((region: Region) => {
    if (region.data.index === regionData.index) {
      region.data = regionData
    }
    return region
  }));

  updateModalState({ index: 0, show: false })
}

const onComponentFormCancel = (regions: Region[], regionIndex: number, setRegions: Function, updateModalState: Function) => {
  const region = regions.find((region: Region) => region.data.index === regionIndex)

  if (region && !region.data.name) {
    setRegions(regions.filter(region => region.data.index !== regionIndex));
  }

  updateModalState({ index: 0, show: false })
}

const ImageEditor = ({ imgData }: ImageEditorProps) => {
  const [regions, setRegions] = React.useState<Region[]>([]);
  const [modalState, updateModalState] = React.useState({ show: false, index: 0 });

  const onRegionEdit = (index: number) => updateModalState({ show: true, index})

  const onRegionDelete = (index: number) => setRegions(regions.filter(region => region.data.index !== index))

  const names = regions.reduce<string[]>((acc, region) => {
    if (region.data.name && !acc.find(n => n === region.data.name)) {
      acc.push(region.data.name)
    }

    return acc
  }, [])

  regions.push({
    x: 32.18390804597701,
    y: 16.147859922178988,
    width: 25.21072796934866,
    height: 19.357976653696497,
    new: false,
    data: {
      name: "asdf",
      index: 0
    },
    isChanging: false
  })

  return (
    <>
      <Modal show={modalState.show}>
        <ComponentForm
          region={regions.find((region: Region) => region.data.index === modalState.index)}
          onSubmit={(regionData: RegionData) => onComponentFormSubmit(regionData, regions, setRegions, updateModalState)}
          onCancel={(regionIndex: number) => onComponentFormCancel(regions, regionIndex, setRegions, updateModalState)}
          names={names}
        />
      </Modal>

      <StyledImageEditor>
        <ReactRegionSelect
          style={{ maxWidth: '80%' }}
          regions={regions}
          onChange={(regions: Region[]) => onRegionChange(regions, setRegions, updateModalState, imgData)}
          regionRenderer={(props: RegionOptionsProps) => (
            <RegionOptions onEditClick={onRegionEdit} onDeleteClick={onRegionDelete} {...props} />
          )}
        >
          <img src={imgData.secure_url} alt=""/>
        </ReactRegionSelect>
      </StyledImageEditor>

      <ExportButtons>
        <React.Suspense fallback={null}>
          <DropDown
            triggerText="Export"
            disabled={!regions.length}
            listItems={[
              <ImageExportButton regions={regions} imgData={imgData} />,
              <TrelloExportButton regions={regions} imgData={imgData} />,
              <JiraExportButton regions={regions} imgData={imgData} />
            ]}
          />
        </React.Suspense>
      </ExportButtons>
    </>
  )
};

export default ImageEditor