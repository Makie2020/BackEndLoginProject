import { Router } from 'express';
import { editUserRole } from '../controllers/userRolesController';

const userRolesRouter = Router();

userRolesRouter.patch('/', editUserRole) 

export default userRolesRouter;