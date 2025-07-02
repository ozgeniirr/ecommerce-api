import { Request, Response } from "express";
import { registerSchema } from "./authValidator";
import { registerUserService } from "./auth.service";
import prisma from "@/config/prisma"



export const register = async (req:Request, res:Response):Promise<any> => {
    const parsed = registerSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            message:"Doğrulama hatası",
            errors: parsed.error.flatten().fieldErrors,
        });

    }
    try{
        const newUser = await registerUserService(parsed.data);
       return res.status(201).json({
            message:"Kayıt başarılı", user: newUser
        })

    }catch (error:any){
        if(error.message==="EMAIL_EXISTS"){
           return res.status(409).json({message:"BU E POSTA ZATEN KULLANILIYOR."});
        }

        return res.status(500).json({message:"Sunucu hatası"});
    }


};

export const getProfile = async(req:Request, res:Response):Promise<any>=>{
    const userId = (req as any).userId;

    try{
        const user= await prisma.user.findUnique({
            where: {id: userId},
            select: {
                id:true,
                email:true,
            }
        });

        if(!user){
            return res.status(404).json({message:"Kullanıcı bulunamadı."});

        }

        res.json({user});

    }catch(error){
        res.status(500).json({message: "Sunucu hatası", error})
    }

};