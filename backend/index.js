import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoutes.js";




dotenv.config();

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
// app.use("/api/user", userRoutes)
app.use("/api/v1/user", userRoutes)





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
