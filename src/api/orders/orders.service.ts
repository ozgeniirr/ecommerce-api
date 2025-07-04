import prisma from "@/config/prisma";
// 1. Sipariş verme isteğinden ürün ID'si ve miktarı al
// 2. Ürünün mevcut stok bilgisini kontrol et
// 3. Yeterli stok varsa siparişi başlat ($transaction başlar)
// 4. - Sipariş kaydını oluştur
// 5. - Sipariş-Ürün (order-product) kaydını oluştur
// 6. - Ürünün stok seviyesini güncelle
// 7. Transaction tamamlanır, sipariş oluşturulur

export const createOrderService = async( userId:number, orderData: any  ) => {
    for (const item of orderData.products) {
  const product = await prisma.product.findUnique({ where: { id: item.productId } });
  if (!product || product.stock < item.quantity) {
    throw new Error("YETERSİZ_STOK");
  }
};
    const result = await prisma.$transaction([
        prisma.order.create({
            data:{
                userId: userId ,
                products:{
                    connect: orderData.products.map((item: any)=> ({id: item.productId}))
                }
            }            
        }),
        ...orderData.products.map((item:any)=>
            prisma.product.update({
                where: {id: item.productId},
                data:{ stock: {decrement: item.quantity}}
            })
        )
    ]);
    return result;
}



