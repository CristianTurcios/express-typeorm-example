
import * as Joi from '@hapi/joi';

// Create and update post Validation
export const createOrUpdatePostValidation = (data: object) => {
    const schema = {
        categories: Joi.string().required(),
        text: Joi.string().required(),
        title: Joi.string().required(),

    };
    return Joi.validate(data, schema);
};
