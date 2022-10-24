import { NextFunction, Request,Response } from "express";
import { loginService,logoutService } from "../services/auth.service";

export const login= async (req:Request,res:Response,next:NextFunction) => {
  loginService(req,res, next);
}

export const logout = async (req:Request,res:Response) => {
  logoutService(req,res);
}