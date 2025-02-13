import { Database } from "../database-interface";
import mongoose from "mongoose";

export class MongooseDatabase implements Database {
    async connect() {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }

        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Mongoose connected!');
        } catch (error) {
            console.error(error);
        }
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}