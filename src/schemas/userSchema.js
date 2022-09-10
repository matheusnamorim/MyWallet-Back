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

export { userSchema, signUpSchema };
