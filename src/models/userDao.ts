import mongoose from 'mongoose';
import { CustomError } from "../utils/error";
import { connectToMongoDB } from "./dataSource";
import {User} from "../utils/Schema";
const { ObjectId } = mongoose.Types;

const signup = async (email: string, password: string, nickname: string) => {
  try {
    await connectToMongoDB();
    new User({
      email: email,
      password: password,
      nickname: nickname,
    }).save();
  } catch{
    const err = new CustomError("dataSource Error", 400);
    throw err;
  }
};

const signin = async(email:string) =>{
  try{
    await connectToMongoDB();
    const result = await User.findOne({ email: email }).select("id email nickname password");
    return result;
  }catch{
    const err = new CustomError("dataSource Error", 400);
    throw err;
  }
}

const getUserById = async (id: any) => {
  try {
    await connectToMongoDB();

    const result = await User.findOne({ _id: new ObjectId(id) }).select("id nickname email password");
    return result;
  } catch {
    const err = new CustomError("dataSource Error", 400);
    throw err;
  }
};

export { 
  signup,
  signin,
  getUserById
};
