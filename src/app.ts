// src/app.ts
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "@/api/auth/auth.routes";
import userRoutes from "@/api/users/users.routes";


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes); // ← Bu satırı unutma
app.use(express.json());

// Middleware ve route bağlantıları yapılacak...

export default app; // bu olmazsa app tanınmaz ❌
