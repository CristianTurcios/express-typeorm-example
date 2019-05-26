import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/User';
import { createUser, updateUser } from './validations/userValidations';

export async function getAll(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find({select: ['id', 'username', 'role']});
    response.send(users);
}

export async function getOne(request: Request, response: Response) {
    const id: number = request.params.id;
    const userRepository = getManager().getRepository(User);
    try {
        const user = await userRepository.findOneOrFail(id, {select: ['id', 'username', 'role']});
    } catch (error) {
        response.status(404).send('Sorry, User not found');
    }
}

export async function post(request: Request, response: Response) {
    const { username, password, role } = request.body;

    const { error } = createUser(request.body);
    if (error) { return response.status(400).send({ error: error.details[0].message }); }

    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > 0) {
        response.status(400).send(errors);
        return;
    }

    user.hashPassword();
    const userRepository = getManager().getRepository(User);
    try {
        await userRepository.save(user);
    } catch (error) {
        response.status(409).send('username already in use');
        return;
    }

    response.status(201).send('User created');
}

export async function put(request: Request, response: Response) {
    const id = request.params.id;
    const { username, role } = request.body;

    const { error } = updateUser(request.body);
    if (error) { return response.status(400).send({ error: error.details[0].message }); }

    const userRepository = getManager().getRepository(User);
    let user;
    try {
        user = await userRepository.findOneOrFail(id);
    } catch (error) {
        response.status(404).send('User not found');
        return;
    }

    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
        response.status(400).send(errors);
        return;
    }

    try {
        await userRepository.save(user);
    } catch (error) {
        response.status(409).send('username already in use');
        return;
    }

    response.status(204).send();
}

export async function remove(request: Request, response: Response) {
    const id = request.params.id;

    const userRepository = getManager().getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail(id);
    } catch (error) {
        response.status(404).send('User not found');
        return;
    }

    userRepository.delete(id);
    response.status(204).send();
}
