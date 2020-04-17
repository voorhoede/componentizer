const cloudinary = require('cloudinary')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

export const handler = async (event) => {
  const { id } = event.queryStringParameters

  try {
    const data = await cloudinary.v2.api.resource(`${process.env.REACT_APP_CLOUDINARY_PRESET}/${id}`);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.log(err)

    return {
      statusCode: 500,
      body: JSON.stringify(err.message)
    }
  }
}
