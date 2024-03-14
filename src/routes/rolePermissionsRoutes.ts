import { Router } from 'express';
import { getRolePermissions } from '../controllers/rolesPermissionsController';

const rolePermissionsRouter = Router();

rolePermissionsRouter.get('/', getRolePermissions) 

export default rolePermissionsRouter;