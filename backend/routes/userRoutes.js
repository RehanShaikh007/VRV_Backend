import express from "express";
import { getUser, updateUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put('/update/:id',verifyToken, updateUser);
router.get('/:id',verifyToken, getUser);

export default router;