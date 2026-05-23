import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`
        );    
        console.log("Connected to MongoDB");
        // Log the connection details, in case we need to debug connection issues
        console.log(`MongoDB Connection Host: ${connectionInstance.connection.host}`);
        console.log(`MongoDB Connection Port: ${connectionInstance.connection.port}`);
        console.log(`MongoDB Connection Name: ${connectionInstance.connection.name}`);
        
    } catch (error) {
        console.log("ERROR: ",error);
        throw error;
    }
}

export default connectDB;
