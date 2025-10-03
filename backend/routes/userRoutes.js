import express from "express"
import { getAdmin, getCurrentUser} from "../controller/userController.js"

import adminAuth from "../middleware/adminAuth.js"
import isAuth from "../middleware/isAuth.js"

const userRoutes = express.Router()


userRoutes.post("/getCurrentUser", isAuth, getCurrentUser)

userRoutes.get("/getAdmin", adminAuth, getAdmin)

export default userRoutes



