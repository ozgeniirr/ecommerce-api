import { Request, Response } from "express";
import { createOrderSchema } from "api/orders/ordersValidator";
import { createOrderService} from "./orders.service";


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