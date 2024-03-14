import { Router } from 'express';
import { getPermissions } from '../controllers/permissionController';

const permissionRouter = Router();

permissionRouter.get('/', getPermissions) 

export default permissionRouter;