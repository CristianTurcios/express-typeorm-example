
import * as Joi from '@hapi/joi';

// Create and update Category Validation
export const createOrUpdateCategoryValidation = (data: object) => {
    const schema = {
        id: Joi.number().positive().allow(null).required(),
        name: Joi.string().required(),
    };
    return Joi.validate(data, schema);
};
