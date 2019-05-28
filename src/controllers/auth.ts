import { validate } from 'class-validator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';
import { config } from '../config';
import { User } from '../entity/User';
import { changePasswordValidation, loginValidation, socialUserValidation} from './validations/authValidations';

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

    response.send({token});
}

export async function loginSocialUser(request: Request, response: Response) {
    const { username, role, provider } = request.body;
    const { error } = socialUserValidation(request.body);

    if (error) { return response.status(400).send({ error: error.details[0].message }); }

    const userRepository = getManager().getRepository(User);

    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
        // User doesnot exist, so create user
        const socialUser = new User();
        socialUser.username = username;
        socialUser.role = role;
        socialUser.password = 'viewer';

        const errors = await validate(socialUser);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        socialUser.hashPassword();
        const socialUserRepository = getManager().getRepository(User);
        try {
            await socialUserRepository.save(socialUser);
        } catch (error) {
            response.status(409).send({ data: 'username already in use' });
            return;
        }
        const socialUsertoken = jwt.sign(
            { userId: socialUser.id, username: socialUser.username, userRole: socialUser.role, provider },
            config.JWT,
            { expiresIn: '2h' },
        );
        response.send({ socialUsertoken });
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username, userRole: user.role, provider },
        config.JWT,
        { expiresIn: '2h' },
    );

    response.send({ token });
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
