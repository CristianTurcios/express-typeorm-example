
import * as Joi from '@hapi/joi';

// Create and update post Validation
export const createOrUpdatePostValidation = (data: object) => {
    const schema = {
        categories: Joi.array().required(),
        id: Joi.number().positive().allow(null).required(),
        text: Joi.string().required(),
        title: Joi.string().required(),
    };
    return Joi.validate(data, schema);
};
