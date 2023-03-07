import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

export const mongoConnect = async () => {
    try {
        console.log("Connecting to MongoDB...");
        mongoose.set('strictQuery', true);
        await connect(process.env.MONGO_URL as string);
        console.log("MongoDB successfully connected!");
    } catch(error) {
        console.log(`MongoDB connection error: ${error}`);
    }
}