import { Request, Response } from "express";
import Product from "../models/product";
import { ValidationError } from "sequelize";


export const getProducts = async (req: Request, res: Response) =>{
    const listProducts = await Product.findAll();

    res.json(listProducts);
}

export const getProduct = async (req: Request, res: Response) =>{
    const { id } = req.params 
    const product = await Product.findByPk(id);

    if(product){
        res.json(product);
    }else{
        res.status(404).json({
            msg: `No existe un producto con este id: ${id}`
        })
    }

}

export const deleteProduct = async (req: Request, res: Response) =>{
    const { id } = req.params 
    const product = await Product.findByPk(id);
    
    if(!product){
        res.status(404).json({
            msg: `No existe un producto con este id: ${id}`
        })
    }else{
        await product.destroy();
        res.json({
            msg: 'Producto eliminado exitosamente'
        })
    }

  
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Product.create(body);
        res.status(201).json({
            msg: 'El producto fue agregado correctamente',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            const messages = error.errors.map(err => err.message);
            res.status(400).json({
                msg: 'Error de validación',
                errors: messages,
            });
        } else {
            console.error(error);
            res.status(500).json({
                msg: 'Ups, surgió un error, comunícate con soporte',
            });
        }
    }
};

export const updateProduct = async (req: Request, res: Response) =>{
    const { body } = req;
    const { id } = req.params;

   try {
    const product = await Product.findByPk(id);
    
    if(product){
        await product.update(body);
        res.json({
            msg: 'Producto actualizado correctamente',
            product
        })
    }else {
        res.status(404).json({
            msg: `No existe un producto con el id: ${id}`,
        })
    }
   } catch (error) {
    console.log(error);
    res.json({
        msg: 'Ups, surgió un error, comunícate con soporte',
    });
   }

   
}