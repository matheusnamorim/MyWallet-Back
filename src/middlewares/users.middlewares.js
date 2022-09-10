import { userSchema, signUpSchema } from "../schemas/userSchema.js";

function validateLogin(req, res, next){
    const validation = userSchema.validate(req.body, { abortEarly: false });
    if(validation.error){
        const message = validation.error.details.map(value => value.message);
        res.status(422).send(message);
        return;
    }
    next();
}

function validateRegister(req, res, next){
    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if(validation.error){
       const message = validation.error.details.map(value => value.message);
       res.status(422).send(message);
       return;
    }
    next();
}

export {validateLogin, validateRegister};