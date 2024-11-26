import {signin, signOut, signup}  from "../controller/authController.js";
import express from "express";
import {verifyToken} from "../utils/verifyUser.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get("/signout", verifyToken, signOut);


export default router;