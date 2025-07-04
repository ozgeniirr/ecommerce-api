import { z } from "zod";

export const createOrderSchema = z.object({
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1, "Adet en az 1 olmalıdır.")
    })
  ).min(1, "En az bir ürün seçmelisiniz")
});
