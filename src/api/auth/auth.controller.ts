import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./authValidator";
import { loginUserService, registerUserService } from "./auth.service";




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

export const login = async(req: Request, res:Response): Promise<any> => {
    const parsed = loginSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            message:"Doğrulama hatası",
            errors: parsed.error.flatten().fieldErrors,
        });

    }
    try{
        const existingUser = await loginUserService(parsed.data);
        return res.status(202).json({
            message:"Giriş başarılı", user: existingUser
        })
    }catch (error:any ){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({message:"BU E POSTA BULUNAMADI"})
        }else if (error.message==="INVALID_PASSWORD"){
            return res.status(400).json({message:"Yanlış şifre"})
        }

        return res.status(500).json({message:"Sunucu hatası"});


    }
}
