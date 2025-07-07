import { Router } from "express";
import { createOrder, getUserOrder, cancelOrder} from "./orders.controller";
import {  isAuthenticated } from "@/middlewares/isAuthenticated";
const router = Router();


router.post("/", isAuthenticated, createOrder);
router.get("/me", isAuthenticated, getUserOrder);
router.put("/:id", isAuthenticated, cancelOrder);






export default router;
