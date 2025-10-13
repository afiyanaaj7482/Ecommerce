
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

// ✅ Load env variables here too
dotenv.config();


// Test Cloudinary connection
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verify config
console.log("Cloudinary Config Test:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✓ Loaded" : "✗ Missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ Loaded" : "✗ Missing"
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log(" No local file path provided");
      return null;
    }

    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      console.log(" File does not exist:", localFilePath);
      return null;
    }

    console.log(" Uploading to Cloudinary:", localFilePath);
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: "products",
    });

    console.log(" Cloudinary upload successful:", response.secure_url);
    
    // Delete local file
    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    console.error(" Cloudinary upload error:", error);
    console.error(" Error details:", {
      message: error.message,
      http_code: error.http_code,
      name: error.name
    });
    
    // Delete local file if it exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export default uploadOnCloudinary;