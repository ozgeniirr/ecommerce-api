import express, { Express } from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/api/auth/auth.routes';
import usersRoutes from './src/api/users/users.routes';
import productRoutes from "./src/api/products/products.routes"
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use("/api/products",productRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

