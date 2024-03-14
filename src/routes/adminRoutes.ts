import { Router } from 'express';
import { getRoles } from '../controllers/authController';
import validateToken from '../middleware/validateToken';
import { authorizationRole } from '../middleware/checkRole';

const adminRouter = Router();

adminRouter.get('/', validateToken, authorizationRole, getRoles) 

export default adminRouter;