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

server.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT}`));