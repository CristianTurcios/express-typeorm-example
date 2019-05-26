import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.auth as string;
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, config.JWT) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.JWT, {
        expiresIn: '2h',
    });
    res.setHeader('token', newToken);
    next();
};
