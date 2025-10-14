import express from "express"
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from "../controller/orderController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";


const orderRoutes = express.Router();

// for USER
orderRoutes.post("/Placeorder" ,isAuth , placeOrder)
orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay)
orderRoutes.post("/userorder" ,isAuth , userOrders)
orderRoutes.post("/verifyrazorpay",isAuth,verifyRazorpay)

// for ADMIN

orderRoutes.post("/list", adminAuth, allOrders)
orderRoutes.post("/status", adminAuth, updateStatus)


export default orderRoutes