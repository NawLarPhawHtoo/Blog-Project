import { Request, Response, NextFunction } from 'express'
import { getPostService,findPostService,createPostService,updatePostService,deletePostService,getPostByCategoryService } from '../services/post.service';


export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getPostService(req, res, next);
};

export const createPost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  createPostService(req, res, next);
}

export const findPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findPostService(req, res, next);
}

export const updatePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  updatePostService(req, res, next);
};

export const deletePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  deletePostService(req, res, next);
};

export const getPostByCategory = async (
  req: any,
res: Response,
  next: NextFunction
)=>{
  getPostByCategoryService(req,res,next);
}