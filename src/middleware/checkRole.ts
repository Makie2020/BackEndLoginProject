import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../interfaces/requestInterface';

export const authorizationRole = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.sendStatus(403);
  } 

  const token = jwt.verify(authorization!.split(" ")[1], process.env.SECRET_KEY);
  req.user = token
  
  if (req.user.role != 1) {
    return res.status(401).json({
      msg: 'Not authorized'
  })
  } else {
    return next();
  }
} 