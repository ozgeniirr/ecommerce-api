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


export const updateProductService = async (id:number, productData: { name: string, price: number, stock:number }) => {
  const existingProduct = await prisma.product.findUnique({where: { id }});
 
  if(!existingProduct){
    throw new Error("NOT_FOUND")
  }

  const updatedProduct = await prisma.product.update({

    where: { id },
    data: { name: productData.name,
      price: productData.price,
      stock: productData.stock

    }
  });
  return updatedProduct;

};


export const deleteProductService = async (id: number) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });

  if (!existingProduct) {
    throw new Error("NOT_FOUND");
  }

  const deletedProduct = await prisma.product.delete({ where: { id } });

  return deletedProduct;
};


export const getProductsService = async( search: string ) => {
  const product = await prisma.product.findMany({
    where: search
     ? { name: { contains: search, mode: "insensitive" }}
     : undefined,
  });
  return product;
  
}
    