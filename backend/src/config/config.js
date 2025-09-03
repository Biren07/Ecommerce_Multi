import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || "",
  mongodb: process.env.MONGODB_URL || "",
  cloudinary: {
    cloudName: process.env.CLOUDNIARY_CLOUD_NAME || "",
    apikey: process.env.CLOUDNIARY_API_KEY || "",
    apiSecret: process.env.CLOUDNIARY_API_SCERET || "",
  },
  jwtSecret: process.env.JWT_SECRET || "",
  emailApiKey: process.env.EMAIL_API_KEY || "",
};
export default config;
