import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";

function connectCloudinary() {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apikey,
    api_secret: config.cloudinary.apiSecret,
  });
}

export default connectCloudinary;
