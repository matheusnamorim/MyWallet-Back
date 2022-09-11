import { userSchema, signUpSchema, releasesSchema } from "../schemas/userSchema.js";
import mongo from "../db/db.js";

let db = await mongo();

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

async function validateToken(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const session = await db.collection('sessions').findOne({token});
    if(!session) return res.sendStatus(401);

    const user = await db.collection('users').findOne({_id: session.userId });
    if(!user) return res.sendStatus(401);
    delete user.password;

    res.locals.user = user;
    next();
}

function validateReleases(req, res, next){
    const validation = releasesSchema.validate(req.body, {abortEarly: false});
    if(validation.error){
        const message = validation.error.details.map(value => value.message);
        return res.status(422).send(message);
    }
    next();
}

export {validateLogin, validateRegister, validateToken, validateReleases};