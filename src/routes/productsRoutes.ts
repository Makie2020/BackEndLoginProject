import { Router } from 'express';
import { getProducts } from '../controllers/productsController';
import validateToken from '../middleware/validateToken';

const productRouter = Router();

productRouter.get('/', validateToken, getProducts) 

export default productRouter;