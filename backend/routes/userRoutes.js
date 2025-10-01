import express from "express"
import { getCurrentUser } from "../controller/userController.js"
import isAuth from "../middleware/isAuth.js"

const userRoutes = express.Router()

userRoutes.post("/getCurrentUser", isAuth , getCurrentUser)

export default userRoutes


// import express from "express";
// import { getCurrentUser } from "../controllers/userController.js";
// import { isAuthenticated } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/getCurrentUser", isAuthenticated, getCurrentUser); // 👈 path match
// export default router;


