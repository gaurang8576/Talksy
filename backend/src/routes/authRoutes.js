import express from "express";
import { getUsers, registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
