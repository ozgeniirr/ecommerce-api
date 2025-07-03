import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email({message: "Geçerli bir e posta girin."}),
    password: z.string().min(6, {message:"ŞİFRE EN AZ 6 KARAKTER OLMALI"}).max(11, {message:"ŞİFRE EN FAZLA 11 KARAKTER OLABİLİR"})
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Şifre boş olamaz"),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Ürün adı boş olamaz"),
  price: z.number().positive("Fiyat pozitif olmalı"),
  stock: z.number().min(0, "Stok 0 veya daha büyük olmalı"),
});











export type RegisterInput = z.infer<typeof registerSchema>;