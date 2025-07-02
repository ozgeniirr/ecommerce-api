import { Router } from "express";
import { getProfile, register } from "./auth.controller";
import { isAuthenticated } from "@/middlewares/isAuthenticated";

const router = Router();


router.get("/profile", isAuthenticated, getProfile)
router.post("/register", register);

export default router;
