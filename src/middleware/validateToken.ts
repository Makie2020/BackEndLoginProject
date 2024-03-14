import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY);
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Not authorized'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Access denied'
        })
    }
}

export default validateToken;