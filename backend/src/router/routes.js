import express from "express";
const router = express.Router();

import { AuthApi } from "../middleware/AuthApi.js";
import { Login, Signup, Logout, getAuthStatus } from "./authController.js";


router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/getAuthStatus", AuthApi, getAuthStatus);


export default router;
