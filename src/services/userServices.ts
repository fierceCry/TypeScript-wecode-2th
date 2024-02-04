import * as userDao from "../models/userDao";
import { validateEmailAndPassword } from "../utils/validate";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { CustomError } from "../utils/error";
import jwt from "jsonwebtoken";
dotenv.config();

const hashPassword = async(password:string)=>{
  return await bcrypt.hash(password, Number(process.env.SAITROUNDS));
}

const getUserById = async (id: string) => {
  return await userDao.getUserById(id);
};

const signup = async(email:string, password:string, nickname:string)=>{
  validateEmailAndPassword(email, password);
  const hashedPassword = await hashPassword(password);
  await userDao.signup(email, hashedPassword, nickname);
}

const signin = async(email:string, password:string) =>{
  const user = await userDao.signin(email);
  if (!user || !user.password) {
    const err = new CustomError("User not found", 400);
    throw err;
  }
  const result = await bcrypt.compare(password, user.password);
  if(!result){
    const err = new CustomError("INVALID_PASSWORD", 400);
    throw err;
  }

  const token = await jwt.sign(
    { 
    id: user.id, 
    email: user.email,
    nickname: user.nickname
  }, process.env.JWT_SECRET as string,
  {
    algorithm: process.env.ALGORITHM as jwt.Algorithm,
    expiresIn: process.env.JWT_EXPIRES_IN as string
  });
  return token;
}

export { 
  signup,
  signin,
  getUserById
};
