import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";
import orderRoute from "./routes/orderRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("Error Connecting MongoDB", error);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});


app.use('/api/auth', authRoute);
app.use("/api/user", userRoute);
app.use("/api", productRoute);
app.use('/api', orderRoute);