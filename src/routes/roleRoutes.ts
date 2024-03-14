import { Router } from 'express';
import { getRoles } from '../controllers/rolesController';

const rolesRouter = Router();

rolesRouter.get('/', getRoles) 

export default rolesRouter;