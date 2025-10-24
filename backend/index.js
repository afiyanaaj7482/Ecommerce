import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";

//Routes import
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoute.js";




dotenv.config();

console.log("Loaded Cloudinary ENV:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary Config Test:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✓ Loaded" : "✗ Missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ Loaded" : "✗ Missing"
});

console.log("rozarpay",{
   key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


const port = process.env.PORT || 8000;
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin:["http://localhost:5173" , "http://localhost:5174"],
 credentials:true
}))

// Routes
app.use("/api/auth", authRoutes)

app.use("/api/user", userRoutes)

app.use("/api/product",productRoutes)

app.use("/api/cart",cartRoutes)

app.use("/api/order",orderRoutes)




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
