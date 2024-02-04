import { Request, Response } from "express";
import { catchAsync } from "../utils/error";
import { CustomError } from "../utils/error";
import * as userService from "../services/userServices";

const signup = catchAsync(async(req:Request, res:Response)=>{
  const { email, password, nickname }:
  {email:string, password:string, nickname:string} = req.body;
  if(!email || !password || !nickname){
    const err = new CustomError("KET ERROR", 400);
    throw err;
  }
  await userService.signup(email, password, nickname);

  res.status(201).json({ message: "user is created"});
})

const signin = catchAsync(async(req:Request, res:Response) =>{
  const { email, password }: {email:string, password:string} = req.body;
  if(!email || !password){
    const err = new CustomError("KET ERROR", 400);
    throw err;
  }
  const result = await userService.signin(email, password);

  res.status(201).json(result);
});

export { 
  signup,
  signin
};