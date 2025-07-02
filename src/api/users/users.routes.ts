import { Router } from "express";
import { getProfile,  } from "./users.controller";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
const router = Router();


router.get("/profile", isAuthenticated, getProfile)

export default router;