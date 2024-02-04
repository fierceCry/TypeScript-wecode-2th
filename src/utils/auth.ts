import jwt from "jsonwebtoken"
import * as userService from "../services/userServices"
import { CustomError } from "./error";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
      user?: any;
  }
}

const loginRequired = async (req: Request, res: Response, next: NextFunction) => {
  try 
  {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new CustomError("NEED_ACCESS_TOKEN", 400);
    }

    const payload = jwt.verify(accessToken, process.env.JWT_SECRET as string);
    if (typeof payload !== "object") {
      throw new CustomError("Invalid payload", 400);
    }
    const user = await userService.getUserById(payload.id as string);
    if (!user) {
      throw new CustomError("USER_DOES_NOT_EXIST", 404);
    }
    req.user = user;
    next();
  } catch{
    throw new CustomError("INVALID_ACCESS_TOKEN", 400);
  }
};

export { loginRequired };
