import * as React from 'react'
import uid from 'uid'
import styled from '../styled-components'
import Modal from './Modal'
import ComponentForm from './ComponentForm'
import RegionOptions, { RegionOptionsProps } from './RegionOptions'
import { CloudinaryImage } from './ImageUploader'
import DropDown from './DropDown'
import useLocalStorage from '../lib/useLocalStorage'
import { useParams } from 'react-router'
const ReactRegionSelect = require('react-region-select')
const TrelloExportButton = React.lazy(() => import('./TrelloExportButton'))
const ImageExportButton = React.lazy(() => import('./ImageExportButton'))

const maxRegionSize = 10

interface ImageEditorProps {
  imgData: CloudinaryImage
}

export interface RegionData {
  index: number
  uid: string
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
  min-height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    background-color: #f1f0ef;
    cursor: crosshair;
  }
`

const ExportButtons = styled.div`
  position: fixed;
  right: 1rem;
  top: 1rem;

  > button {
    margin-left: 1rem;
  }
`
const ImageEditor = ({ imgData }: ImageEditorProps) => {
  const params = useParams<{ id: string }>()
  const [regions, setRegions] = useLocalStorage<Region[]>(params.id, [])
  const [modalState, updateModalState] = React.useState({
    show: false,
    index: 0,
  })

  const onRegionChange = (updatedRegions: Region[]) => {
    const prevRegions = regions

    updatedRegions = updatedRegions
      .map((region, index) => {
        if (!region.data.uid) {
          region.data.uid = uid()
        }

        region.data.index = index
        return region
      })
      .filter(region => {
        const prevRegionState: Region | undefined = prevRegions.find(
          (prevRegion: Region) => region.data.index === prevRegion.data.index
        )

        if (prevRegionState && !prevRegionState.new) {
          return true
        }

        const width = Math.round(region.width * (imgData.width / 100))
        const height = Math.round(region.height * (imgData.height / 100))

        return (
          region.isChanging || (width > maxRegionSize && height > maxRegionSize)
        )
      })

    prevRegions.forEach((prevRegion: Region) => {
      const nextRegionState: Region | undefined = updatedRegions.find(
        (region: Region) => region.data.index === prevRegion.data.index
      )

      if (nextRegionState && prevRegion.new !== nextRegionState.new) {
        updateModalState({
          show: true,
          index: prevRegion.data.index,
        })
      }
    })

    setRegions(updatedRegions)
  }

  const onComponentFormSubmit = (regionData: RegionData) => {
    setRegions(
      regions.map((region: Region) => {
        if (region.data.index === regionData.index) {
          region.data = regionData
        }
        return region
      })
    )

    updateModalState({ index: 0, show: false })
  }

  const onComponentFormCancel = (regionIndex: number) => {
    const region = regions.find(
      (region: Region) => region.data.index === regionIndex
    )

    if (region && !region.data.name) {
      setRegions(regions.filter(region => region.data.index !== regionIndex))
    }

    updateModalState({ index: 0, show: false })
  }

  const onRegionEdit = (index: number) =>
    updateModalState({ show: true, index })

  const onRegionDelete = (index: number) =>
    setRegions(regions.filter(region => region.data.index !== index))

  const names = regions.reduce<string[]>((acc, region) => {
    if (region.data.name && !acc.find(n => n === region.data.name)) {
      acc.push(region.data.name)
    }

    return acc
  }, [])

  return (
    <>
      <Modal show={modalState.show}>
        <ComponentForm
          region={regions.find(
            (region: Region) => region.data.index === modalState.index
          )}
          onSubmit={(regionData: RegionData) =>
            onComponentFormSubmit(regionData)
          }
          onCancel={(regionIndex: number) => onComponentFormCancel(regionIndex)}
          names={names}
        />
      </Modal>

      <StyledImageEditor>
        <ReactRegionSelect
          style={{ maxWidth: '80%' }}
          regions={regions}
          onChange={onRegionChange}
          regionRenderer={(props: RegionOptionsProps) => (
            <RegionOptions
              onEditClick={onRegionEdit}
              onDeleteClick={onRegionDelete}
              {...props}
            />
          )}
        >
          <img src={imgData.secure_url} alt="" />
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
            ]}
          />
        </React.Suspense>
      </ExportButtons>
    </>
  )
}

export default ImageEditor
