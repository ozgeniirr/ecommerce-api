import { Request, Response } from "express";
import { cancelOrderSchema, createOrderSchema } from "api/orders/ordersValidator";
import { createOrderService, getUserOrderService, cancelOrderService} from "./orders.service";


export const createOrder = async( req: Request, res: Response):Promise<any> => {
    const parsed= createOrderSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            message:"Doğrulama hatası",
            errors: parsed.error.flatten().fieldErrors,
        });
    }
    const userId = (req as any).userId;
    try{
        const order = await createOrderService (userId, parsed.data)
        return res.status(201).json({
            message:"Sipariş başarıyla oluşturuldu", order

        })
    }catch(error:any){
        if(error.message==="YETERSİZ_STOK"){
            return res.status(400).json({
                message:"Yeterli stok yok lütfen daha az seçim yapınız."
            })
        }
        return res.status(500).json({
            message:"Sunucu hatası", error: error.message
        });
    }

}
export const getUserOrder = async (req:Request, res:Response):Promise<any> => {
   const userId = (req as any ).userId;
  
   try{
     const order = await getUserOrderService (userId)
     const simplifiedOrders = order.map((order:any) =>({
        orderDate: order.createdAt,
        products: order.orderItems.map((item:any)=>({
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            totalPrice: item.quantity * item.product.price
        })),
        
     }));

     return res.status(201).json({
        message:"Kullanıcı-Sipariş verileri oluşturuldu.", simplifiedOrders
     })
   }catch(error:any){
    if(error.message==="SİPARİŞ_YOK"){
        return res.status(400).json({
            message:"Sipariş bulunamadı."
        });
    }
    return res.status(500).json({
        message:"Sunucu hatası", error: error.message
    })

   }
}

export const cancelOrder = async( req:Request, res: Response):Promise<any> => {
    const parsed = cancelOrderSchema.safeParse(req.params);

    if(!parsed.success){
        return res.status(400).json({
            message:"Doğrulama Hatası",
            errors: parsed.error.flatten().fieldErrors
        });

    }
    try{
        const orderID = Number(parsed.data.id);
        const userId = (req as any).userId
        const cancelledOrder = await cancelOrderService (orderID, userId )

        return res.status(200).json({
            message:"Sipariş iptal edildi", cancelledOrder
        });

    }catch(error:any){
        if(error.message==="NO_ORDER"){
            return res.status(400).json({
                message:"Böyle bir sipariş bulunamadı."
            })
        }
        
        else if (error.message==="ALREADY_CANCELLED"){
            return res.status(400).json({
                message:"Zaten iptal edildi."
            })
        }

        return res.status(500).json({
            message:"Sunucu Hatası", error: error.message 
        });
    }
}