import { Router } from "express";
import { isAdmin, isAuthenticated } from "@/middlewares/isAuthenticated";
import { createProduct, updateProduct, deleteProduct, getProducts } from "./products.controller";
const router = Router();


router.post("/", isAuthenticated, isAdmin, createProduct);
router.put("/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct );
router.get("/search", getProducts);
export default router;


