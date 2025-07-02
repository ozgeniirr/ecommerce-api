import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt"; // alias doğruysa


export const isAuthenticated = async(req:Request, res:Response, next:NextFunction):Promise<any> =>{
   
    const authHeader= req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Yetkisiz erişim, token yok"});

    
    }

      const token = authHeader.split(" ")[1];
        
      try {
        const decoded = verifyToken(token);
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Geçersiz token." });
    }


}



