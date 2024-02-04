import * as reviewsDao from "../models/reviewsDao";

const reviewSet = async(userId:string)=>{
  return await reviewsDao.reviewSet(userId);
}

const reviewCreate = async (userId:string, content:string, rating:any) =>{
  await reviewsDao.createReview(userId, content, rating);
};

const reviewModify = async (content:string, rating:string, reviewId:string ) =>{
  await reviewsDao.modifyReview(content, rating, reviewId );
};

const reviewDelete = async (reviewId:string)=>{
  await reviewsDao.reviewDelete(reviewId);
};

export { 
  reviewSet,
  reviewCreate,
  reviewModify,
  reviewDelete
};
