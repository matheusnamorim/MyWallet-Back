import joi from 'joi';

const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().trim().required()
});

const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().trim().required()
});

const releasesSchema = joi.object({
    value: joi.string().trim().required(),
    description: joi.string().trim().max(25).required(),
    type: joi.string().valid('entry', 'exit').required()
});
export { userSchema, signUpSchema, releasesSchema };
