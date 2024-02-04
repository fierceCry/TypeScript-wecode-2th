import dotenv from "dotenv";
import mongoose from 'mongoose';
import { CustomError } from "../utils/error";
dotenv.config();

const connectToMongoDB = async (): Promise<typeof mongoose> => {
  try {
      return await mongoose.connect(process.env.MANGODB_URL as string, {});
  } catch{
    const error =  new CustomError("connectToMongoDB", 400);
      throw error;
  }
};

export { connectToMongoDB };
