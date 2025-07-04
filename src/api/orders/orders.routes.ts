import { Router } from "express";
import { createOrder} from "./orders.controller";
import {  isAuthenticated } from "@/middlewares/isAuthenticated";
const router = Router();


router.post("/", isAuthenticated, createOrder);



export default router;
