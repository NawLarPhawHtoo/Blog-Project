import { Express, Request, Response, NextFunction } from "express";
import {
  getUserService,
  findUserService,
  createUserService,
  updateUserService,
  deleteUserService,
  passwordChangeService
} from "../services/user.service";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUserService(req, res, next);
};

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findUserService(req, res, next);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createUserService(req, res, next);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  updateUserService(req, res, next);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  deleteUserService(req, res, next);
};

export const passwordChange = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
 passwordChangeService(req, res, next);
}
