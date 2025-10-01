import express from "express"
import {  googleLogin, login, logOut, registration } from "../controller/authController.js"

const authRoutes = express.Router()

authRoutes.post("/registration",registration)
authRoutes.post("/login",login)
authRoutes.get("/logout",logOut )
authRoutes.post("/googleLogin",googleLogin )

export default authRoutes   