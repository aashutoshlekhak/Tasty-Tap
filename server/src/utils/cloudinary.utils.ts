import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  // cloud_name: "dxxnvyyzv",
  // api_key: "319562443141216",
  // api_secret: "-ZYAm348Pku9Ye8mQqiEP_UAkh4",
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(response.secure_url);
    return response;
  } catch (error) {
    /**Remove file, if upload fail */
    fs.unlinkSync(localFilePath);
    return null;
  }
};
