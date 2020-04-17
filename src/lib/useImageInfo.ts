import * as React from 'react'
import { CloudinaryImage } from '../components/ImageUploader'

export default function useImageInfo (id: string) {
  const [imageInfo, setImageInfo] = React.useState<null | CloudinaryImage>(null)

  React.useEffect(() => {
    fetch(`/.netlify/functions/image-info?id=${id}`)
    .then(res => res.json())
    .then((data: CloudinaryImage) => setImageInfo(data))
  }, [id])

  return imageInfo
}
