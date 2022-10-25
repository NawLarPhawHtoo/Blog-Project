import { NextFunction, Request,Response } from "express";
import { loginService,logoutService } from "../services/auth.service";
import { forgetPasswordService ,resetPasswordService,passwordChangeService} from "../services/auth.service";

export const login= async (req:Request,res:Response,next:NextFunction) => {
  loginService(req,res, next);
}

export const logout = async (req:Request,res:Response) => {
  logoutService(req,res);
}

export const forgotPassword = async (req: any, res: Response) => {
  forgetPasswordService(req, res);
};

export const resetPassword = async (req: Request, res: Response) => {
  resetPasswordService(req, res);
}
export const passwordChange = async (req: Request, res: Response) => {
  passwordChangeService(req, res);
}