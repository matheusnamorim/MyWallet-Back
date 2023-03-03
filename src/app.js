import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './Routers/users.routers.js'

import mongo from './db/db.js';
await mongo();

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(usersRouter);
//

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Listening on port ${port}`));