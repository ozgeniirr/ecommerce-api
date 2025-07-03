import { Router } from "express";
import { isAdmin, isAuthenticated } from "@/middlewares/isAuthenticated";
import { createProduct } from "./products.controller";
const router = Router();


router.post("/", isAuthenticated, isAdmin, createProduct);
export default router;


