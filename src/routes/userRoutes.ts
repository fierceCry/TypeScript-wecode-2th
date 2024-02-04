import express from "express";
import * as userControllers from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.post("/signup", userControllers.signup);
userRouter.post("/signin", userControllers.signin);

export { userRouter };