import express from "express";
import dotenv from "dotenv";
dotenv.config();


import authRoutes from "@/api/auth/auth.routes";
import userRoutes from "@/api/users/users.routes";
import productRoutes from "@/api/products/products.routes";
import orderRoutes from "@/api/orders/orders.routes";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;

