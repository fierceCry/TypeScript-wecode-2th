import  express from "express";
import * as reviewsController from "../controllers/reviewsController";
import { loginRequired  } from "../utils/auth";
const reviewsRouter = express.Router();

reviewsRouter.get("/reviews", loginRequired, reviewsController.reviewSet);
reviewsRouter.post("/reviews", loginRequired, reviewsController.reviewCreate);
reviewsRouter.put("/reviews", loginRequired, reviewsController.reviewModify);
reviewsRouter.delete("/reviews", loginRequired, reviewsController.reviewDelete);

export { reviewsRouter };