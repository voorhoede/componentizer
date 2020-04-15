import { Region } from '../components/ImageEditor'
import { CloudinaryImage } from '../components/ImageUploader'

const getPercentage = (value: number) => {
  return value / 100
}

export default (region: Region, imgData: CloudinaryImage) => {
  const { width, height, public_id } = imgData

  const widthInPx = Math.round(width * getPercentage(region.width))
  const heightInPx = Math.round(height * getPercentage(region.height))
  const xInPx = Math.round((region.x + region.width * 0.5) * (width / 100))
  const yInPx = Math.round((region.y + region.height * 0.5) * (height / 100))

  const croppedImage = `https://res.cloudinary.com/${process.env
    .REACT_APP_CLOUDINARY_CLOUD!}/w_${widthInPx},h_${heightInPx},c_crop,g_xy_center,x_${xInPx},y_${yInPx},f_auto/${public_id}`

  return {
    ...region.data,
    attachments: [{ url: croppedImage }],
  }
}
