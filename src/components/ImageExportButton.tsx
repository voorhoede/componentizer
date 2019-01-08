import * as React from 'react'
import Button from './styled-components/Button'
import { Region } from './ImageEditor'
import { CloudinaryImage } from './ImageUploader';
import generateComponentImageUrl from '../lib/generateComponentImageUrl';
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import { RegionComponent } from '../lib/trello';
import mergeComponents from '../lib/mergeComponents'

interface ImageExportButtonProps {
  regions: Region[]
  imgData: CloudinaryImage
  disabled: boolean
  [propName: string]: {}
}

interface ComponentFiles {
  name?: string
  images: Blob[]
}

const ExportButton = ({ regions, imgData, ...props}: ImageExportButtonProps) => {
  const [loading, setLoading] = React.useState(false)
  
  const exportAsImages = async () => {
    const zip = new JSZip()
    const folder = zip.folder('components')

    setLoading(true)

    // generate blobs for region image files
    const components = await Promise.all(
      mergeComponents(regions.map((region: Region) => generateComponentImageUrl(region, imgData)))
        .map(async (component: RegionComponent) => ({
          name: component.name,
          images: await Promise.all(component.attachments.map(async attachment => {
            return await fetch(attachment.url)
                .then(res => res.blob())
          }))
        }))
    )
    
    // add files to the zip
    components.forEach((component: ComponentFiles) => {
      if (component.images.length > 1) {
        const compontFolder = folder.folder(component.name || '');
  
        component.images.forEach((image, index) => {
          compontFolder.file(`${String(component.name)}-${index}.png`, image)
        })
      } else {
        folder.file(`${String(component.name)}.png`, component.images[0])
      }
    })

    // save to zip file
    zip.generateAsync({ type: "blob" })
        .then(blob => saveAs(blob, 'components.zip'))
        .catch(e => console.log(e));
    
    setLoading(false)
  }

  return (
    <Button
      onClick={exportAsImages}
      {...props}
      disabled={props.disabled || loading}
    >Export as images <span className="icon">{ loading ? '⏳' : '🖼'}</span></Button>
  )
}

export default ExportButton;