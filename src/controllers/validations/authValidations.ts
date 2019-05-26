
import * as Joi from '@hapi/joi';

// Login Validation
export const loginValidation = (data: object) => {
    const schema = {
        password: Joi.string().min(4).max(100).required(),
        username: Joi.string().min(4).max(20).required(),
    };
    return Joi.validate(data, schema);
}

// change password Validation
export const changePasswordValidation = (data: object) => {
    // Also we can apply regex to validate the strong of the password :|
    const schema = {
        newPassword: Joi.string().min(4).max(100).required(),
        oldPassword: Joi.string().min(4).max(100).required(),
    };
    return Joi.validate(data, schema);
};
