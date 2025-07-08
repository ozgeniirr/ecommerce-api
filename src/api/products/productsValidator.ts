import { z } from "zod";


export const createProductSchema = z.object({
  name: z.string().min(1, "Ürün adı boş olamaz"),
  price: z.number().positive("Fiyat pozitif olmalı"),
  stock: z.number().min(0, "Stok 0 veya daha büyük olmalı"),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Ürün adı boş olamaz"),
  price: z.number().positive("Fiyat pozitif olmalı"),
  stock: z.number().int().nonnegative("Stok negatif olamaz")
});

export const searchProductSchema = z.object({
  search: z.string().optional().default(""),
});

