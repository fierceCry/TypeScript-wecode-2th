import mongoose from 'mongoose';
import { CustomError } from "../utils/error";
import { User, Review} from "../utils/Schema";
import { connectToMongoDB } from "./dataSource";
const { ObjectId } = mongoose.Types;

const reviewSet = async(userId:string)=>{
  try{
    return await User.findOne({_id: userId}).select("nickname profile_image")
  }catch{
    throw new CustomError("dataSource Error", 400);
  }
}

const createReview = async(userId:string, content:string, rating:any)=>{
  try{
    new Review({
      user: userId,
      content: content,
      rating: rating,
    }).save();
  }catch{
    throw new CustomError("dataSource Error", 400);
  }
}

const modifyReview = async (content: string, rating: string, reviewId: string) => {
  try {
    await Review.updateOne({ _id: new ObjectId(reviewId) }, { $set: { content: content, rating: rating } });
  } catch{
    throw new CustomError("dataSource Error", 400);
  }
};

const reviewDelete = async(reviewId:string)=>{
  try{
    await Review.deleteOne({_id: new ObjectId(reviewId)});
  }catch{
    throw new CustomError("dataSource Error", 400);
  }
}

export { 
  reviewSet,
  createReview,
  modifyReview,
  reviewDelete
};