import express from 'express'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.ENVIRONMENT == 'dev' ? false : true
})

const signatureRouter = express.Router();

signatureRouter.post('/',(req,res) => {

  const { folder } = req.body;

  if (!folder) {
    res.status(401).json({message:"Folder name needed!"});
    return;
  }

  try {
    const timestamp = Math.round((new Date).getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request({
      timestamp,
      folder
    }, process.env.CLOUDINARY_API_SECRET);

    res.status(200).json({ timestamp, signature })
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }

  
})

export default signatureRouter