import express from "express";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const port = process.env.PORT || 6000;
const app = express();

app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
