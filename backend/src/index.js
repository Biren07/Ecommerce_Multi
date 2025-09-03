import express from "express";
import multer from "multer";
import cors from "cors";


import config from "./config/config.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import bodyParser from "body-parser";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import userRouter from "./routes/userRoute.js"
import authRoutes from "./routes/authRoute.js"

const app = express();
const upload =multer({storage:multer.memoryStorage()});



connectDB();
connectCloudinary();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/users",auth,upload.single("image"),userRouter)
app.listen(config.port, () => {
  console.log(`Server is running ${config.port}...`);
});
