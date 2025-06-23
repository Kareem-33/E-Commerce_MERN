import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import { seedInitialProducts } from './services/product.service';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

seedInitialProducts();

app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});