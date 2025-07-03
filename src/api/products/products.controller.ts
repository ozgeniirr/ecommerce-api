import { Request, Response } from "express";
import { createProductSchema  } from "api/auth/authValidator";
import { createProductService } from "./products.service";


export const createProduct = async (req: Request, res: Response): Promise<any> =>{
    const parsed = createProductSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            message:"Doğrulama hatası",
            errors: parsed.error.flatten().fieldErrors
        
        });
    }
    try{
        const newProduct = await createProductService(parsed.data);
        return res.status(201).json({message:"Yeni ürün kaydı yapıldı", product:newProduct});

    }catch(error: any){
        return res.status(500).json({message:"Sunucu hatası."});

    }
    
}