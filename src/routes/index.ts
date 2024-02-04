import express from "express";
import { userRouter } from "./userRoutes";
import { reviewsRouter } from "./reviewsRouter";

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/reviews", reviewsRouter);

export { routes };