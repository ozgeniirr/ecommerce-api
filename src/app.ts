// src/app.ts
import express from "express";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());

// Middleware ve route bağlantıları yapılacak...

export default app; // bu olmazsa app tanınmaz ❌
