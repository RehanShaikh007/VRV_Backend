import express from "express";
import {verifyToken} from "../utils/verifyUser.js";
import { cancelOrder, placeOrder, viewOrders, viewSingleOrder } from "../controller/orderController.js";


const router = express.Router();

router.post('/orders', verifyToken, placeOrder);
router.get('/orders', verifyToken, viewOrders);
router.get('/orders/:id', verifyToken, viewSingleOrder);
router.delete('/orders/:id', verifyToken, cancelOrder);


export default router;