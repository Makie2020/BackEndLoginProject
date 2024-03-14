import { Request, Response } from 'express';
import {Product} from '../models/product';
import { IProduct } from '../interfaces/productInterface';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Product.findAll();
    res.json(listProducts)
}

export const createProduct = async (req: Request, res: Response): Promise<IProduct> => {
    const product = await Product.create(req.body)
    return product;
}