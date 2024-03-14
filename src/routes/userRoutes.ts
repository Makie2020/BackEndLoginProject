import { Router } from 'express';
import { allUsers, newUser } from '../controllers/userController';
import { loginUser } from '../controllers/userController';

const userRouter = Router();

userRouter.post('/', newUser) 
userRouter.post('/login', loginUser) 
userRouter.get('/', allUsers)

export default userRouter;