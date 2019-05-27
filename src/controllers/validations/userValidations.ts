
import * as Joi from '@hapi/joi';

// Create user validation
export const createUser = (data: object) => {
    const schema = {
        id: Joi.number().positive().allow(null).required(),
        password: Joi.string().min(4).max(100).required(),
        role: Joi.string().required(),
        username: Joi.string().min(4).max(20).required(),
    };
    return Joi.validate(data, schema);
}

// Update user Validation
export const updateUser = (data: object) => {
    const schema = {
        id: Joi.number().positive().allow(null).required(),
        role: Joi.string().required(),
        username: Joi.string().min(4).max(100).required(),
    };
    return Joi.validate(data, schema);
};
