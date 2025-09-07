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
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const upload =multer({storage:multer.memoryStorage()});



connectDB();
connectCloudinary();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/users",auth,upload.single("image"),userRouter);
app.use("/api/products",upload.array("images",5),productRoutes);
app.use("/api/orders", auth, orderRoutes);
app.listen(config.port, () => {
  console.log(`Server is running ${config.port}...`);
});
