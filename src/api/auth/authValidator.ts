import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email({message: "Geçerli bir e posta girin."}),
    password: z.string().min(6, {message:"ŞİFRE EN AZ 6 KARAKTER OLMALI"}).max(11, {message:"ŞİFRE EN FAZLA 11 KARAKTER OLABİLİR"})
});

export type RegisterInput = z.infer<typeof registerSchema>;