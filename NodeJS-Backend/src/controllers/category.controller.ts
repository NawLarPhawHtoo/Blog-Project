import { Request, Response, NextFunction } from 'express'
import { getCategoryService,findCategoryService,updateCategoryService,deleteCategoryService, createCategoryService } from '../services/category.service';

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getCategoryService(req, res, next);
};

export const createCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  createCategoryService(req, res, next);
}

export const findCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findCategoryService(req, res, next);
}

export const updateCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  updateCategoryService(req, res, next);
};

export const deleteCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  deleteCategoryService(req, res, next);
};