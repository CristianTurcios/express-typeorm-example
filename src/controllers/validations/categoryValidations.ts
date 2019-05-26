
import * as Joi from '@hapi/joi';

// Create and update Category Validation
export const createOrUpdateCategoryValidation = (data: object) => {
    const schema = {
        name: Joi.string().required(),
    };
    return Joi.validate(data, schema);
};
