import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/User';

export const verifyUserRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

        const userRepository = getManager().getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        console.log('user role', user.role);
        if (roles.indexOf(user.role) > -1) {
            next();
        } else {
            res.status(401).send();
        }
    };
};
