import mongo from '../db/db.js';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

let db = await mongo();

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usersList = await db.collection('users').find().toArray();
        const user = usersList.find(value => value.email === email); 
        if(user !== undefined && bcrypt.compareSync(password, user.password)){
            const token = uuid();
            db.collection('sessions').insertOne({
                token,
                userId: user._id
            });
            res.status(200).send(token);
            return;
        }else{
            res.sendStatus(404);
            return;
        }
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

const register =  async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userList = await db.collection('users').find().toArray();
        if((userList.find(value => value.name === name || value.email === email))){
            res.sendStatus(409);
            return;
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        await db.collection('users').insertOne({
            name,
            email,
            password: passwordHash
        });
        res.sendStatus(201);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

const info = async(req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    try {
        const session = await db.collection('sessions').findOne({token});
        if(!session) return res.sendStatus(401);

        const user = await db.collection('users').findOne({_id: session.userId });
        
        delete user.password;
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export {login, register, info};