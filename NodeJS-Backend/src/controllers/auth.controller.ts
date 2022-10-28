import { NextFunction, Request,Response } from "express";
import { loginService,logoutService } from "../services/auth.service";
import { forgetPasswordService ,passwordResetService,passwordChangeService} from "../services/auth.service";

export const login= async (req:Request,res:Response,next:NextFunction) => {
  loginService(req,res, next);
}

export const logout = async (req:Request,res:Response) => {
  logoutService(req,res);
}

export const forgotPassword = async (req: any, res: Response) => {
  forgetPasswordService(req, res);
};

export const passwordReset = async (req: Request, res: Response) => {
  passwordResetService(req, res);
}
export const passwordChange = async (req: Request, res: Response) => {
  passwordChangeService(req, res);
}