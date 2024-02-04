import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  }
}

const catchAsync = (func:any) => {
  return (req: Request, res: Response, next: NextFunction) =>{
    func(req, res, next).catch((error:any) => next(error));
  };
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
};

export { catchAsync, globalErrorHandler, CustomError };