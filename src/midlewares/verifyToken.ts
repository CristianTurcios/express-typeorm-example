import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] as string;
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token.split(' ').pop(), config.JWT) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.JWT, {
        expiresIn: '2h',
    });
    res.setHeader('Authorization', `Bearer ${newToken}`);
    next();
};
