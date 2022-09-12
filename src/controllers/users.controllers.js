import mongo from '../db/db.js';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import dayjs from 'dayjs';
import { ObjectId } from 'bson';

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
            return res.Status(404);
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

const infos = (req, res) => {
    try {
        return res.status(200).send(res.locals.user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const registerReleases = async (req, res) => {
    const { value, description, type } = req.body;
    const {user} = res.locals;
    try {
        await db.collection('releases').insertOne({
            userId: user._id,
            value,
            description,
            type,
            date: dayjs().format('DD/MM')
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const listReleases = async (req, res) => {
    const { user } = res.locals;
    try {
        const list = await db.collection('releases').find({userId: user._id}).toArray();
        return res.status(200).send(list);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteReleases = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('releases').deleteOne({_id: ObjectId(id)});
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export {login, register, infos, registerReleases, listReleases, deleteReleases};