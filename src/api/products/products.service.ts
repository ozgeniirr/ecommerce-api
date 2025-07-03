import prisma from "@/config/prisma";  





export const createProductService = async (productData: { name: string; price: number; stock: number }) => {
  const product = await prisma.product.create({
    data: {
        name: productData.name,
        price: productData.price,
        stock: productData.stock

    }
  });
  return product;
};
