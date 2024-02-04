import * as reviewsService from "../services/reviewsService";
import { catchAsync } from "../utils/error";
import { Request, Response } from "express";

const reviewSet = catchAsync(async( req:Request,  res: Response)=>{
  const userId = req.user.id;
  const result = await reviewsService.reviewSet(userId);
  res.status(201).json(result);
})

const reviewCreate =  catchAsync(async( req:Request, res:Response ) => {
  const userId = req.user.id;
  const {content, rating } = req.body;
  const posts = await reviewsService.reviewCreate(userId, content, rating);
  res.status(200).json( posts );  
});

const reviewModify = catchAsync(async(req:Request, res:Response) => {
  const { content, rating, reviewId } = req.body;
  await reviewsService.reviewModify( content, rating, reviewId );
  res.status(200).json({message: "Update Successful"}); 
});

const reviewDelete = catchAsync(async(req:Request, res:Response) => {
  const { reviewId } = req.params;
  await reviewsService.reviewDelete(reviewId);
  res.status(200).json({message: "Deleted successfully"});  
});

export { 
  reviewSet,
  reviewCreate,
  reviewModify,
  reviewDelete
};