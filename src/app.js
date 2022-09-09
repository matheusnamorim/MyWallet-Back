import express from 'express';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb';
import joi from 'joi';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
    db = mongoClient.db('MyWallet');
});

const userSchema = joi.object({
    email: joi.string().email().required()
});

const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().trim().required()
});

server.get('/sign-in', async (req, res) => {
    try {
        await db.collection('users').insertOne({name: 'teste'});
        res.send('ok');
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
    
});


server.post('/sign-in', async (req, res) => {
    try {
        const validation = userSchema.validate(req.body);
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(422).send(message);
            return;
        }
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
});

server.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const validation = signUpSchema.validate(req.body, { abortEarly: false });
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(422).send(message);
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
});

server.listen(5000, () => console.log('Listening on port 5000'));