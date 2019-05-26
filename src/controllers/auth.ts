import { validate } from 'class-validator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';
import { config } from '../config';
import { User } from '../entity/User';
import { changePasswordValidation, loginValidation} from './validations/authValidations';

export async function login(request: Request, response: Response) {
    const { username, password } = request.body;
    const { error } = loginValidation(request.body);

    if (error) { return response.status(400).send({ error: error.details[0].message }); }

    const userRepository = getManager().getRepository(User);

    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
        console.log('err', error);
        response.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        response.status(401).send();
        return;
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username, userRole: user.role },
        config.JWT,
        { expiresIn: '2h' },
    );

    response.send(token);
}

export async function changePassword(request: Request, response: Response) {
    const id = response.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = request.body;
    const { error } = changePasswordValidation(request.body);

    if (error) {
        return response.status(400).send({ error: error.details[0].message });
    }

    if (!(oldPassword && newPassword)) {
        response.status(400).send();
    }

    const userRepository = getManager().getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail(id);
    } catch (id) {
        response.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        response.status(401).send();
        return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
        response.status(400).send(errors);
        return;
    }

    user.hashPassword();
    userRepository.save(user);
    response.status(204).send();
}
