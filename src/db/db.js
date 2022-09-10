import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

// let db;

// mongoClient.connect(() => {
//     db = mongoClient.db('MyWallet');
// });

export default async function mongo () {
    let connect;

    try {
        
        connect = await mongoClient.db('MyWallet');
    return connect;
    } catch (error) {
        console.error(error)
        return error;    
    }
}