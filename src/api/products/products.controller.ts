import { Request, Response } from "express";
import { createProductSchema, searchProductSchema, updateProductSchema  } from "api/products/productsValidator";
import { createProductService, deleteProductService, getProductsService, updateProductService} from "./products.service";


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
};


export const updateProduct = async (req:Request, res:Response): Promise<any> => {
    const parsed = updateProductSchema.safeParse(req.body);
    

    if(!parsed.success){
        return res.status(400).json({
            message:"Doğrulama hatası",
            errors: parsed.error.flatten().fieldErrors
        });
    }

    try{
        const id = Number(req.params.id);
        const uProduct = await updateProductService(id, parsed.data);
        return res.status(201).json({message: "Ürün güncellendi ", product: uProduct});
    }catch(error:any){
        if(error.message === "NOT_FOUND"){
           return res.status(404).json({message:"Böyle bir ürün bulunamadı"})
        }

        return res.status(500).json({message:"Sunucu hatası"})
        
    }

};


export const deleteProduct = async (req:Request, res:Response): Promise<any> => {

    try{
        const id = Number(req.params.id);
        const dProduct = await deleteProductService(id);
        return res.status(200).json({message:"Ürün silindi", product: dProduct});

    }catch(error:any){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({message:"böyle bir ürün bulunamadı."})
        }

        return res.status(500).json({message:"Sunucu hatası"})
    }

};

export const getProducts = async (req:Request, res:Response): Promise<any> => {
    const parsed = searchProductSchema.safeParse(req.query);

    if(!parsed.success){
        return res.status(400).json({
            message:"Lütfen geçerli bir arama terimi giriniz",
            errors: parsed.error.flatten().fieldErrors
        });

    }

    try{
        const products = await getProductsService (parsed.data.search);
        return res.status(200).json({
            message:"Aradığınız ürün/ürünler: ", products
        })


    }catch(error:any){
        return res.status(500).json({
            message:"Sunucu hatası"
        });


    }
}