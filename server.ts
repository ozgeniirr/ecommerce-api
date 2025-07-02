import express, { Express } from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/api/auth/auth.routes';
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});