import * as React from 'react'
import Button from './styled-components/Button'
import { Region } from './ImageEditor'
import { CloudinaryImage } from './ImageUploader';
import generateComponentImageUrl from '../lib/generateComponentImageUrl';
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import mergeComponents from '../lib/mergeComponents'
import getImageFiles from '../lib/getImageFiles'
import { format } from 'date-fns'

interface ImageExportButtonProps {
  regions: Region[]
  imgData: CloudinaryImage
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
    const folderName = `components-${format(new Date(), 'YYYY-MM-DD_hhmm')}`
    const folder = zip.folder(folderName)

    setLoading(true)

    // generate blobs for region image files
    const components = await getImageFiles(
      mergeComponents(regions.map((region: Region) => generateComponentImageUrl(region, imgData)))
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
        .then(blob => saveAs(blob, `${folderName}.zip`))
        .catch(e => console.log(e));
    
    setLoading(false)
  }

  return (
    <Button
      onClick={exportAsImages}
      {...props}
      disabled={loading}
    >Export{ loading && 'ing' } as images <span className="icon">{ loading ? '⏳' : '🖼'}</span></Button>
  )
}

export default ExportButton;