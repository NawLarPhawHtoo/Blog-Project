import { NextFunction, Request,Response } from "express";
import bcrypt, { compareSync, hash } from "bcrypt";
import crypto from "crypto";
import  jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/User";
import PasswordReset from "../models/password.reset";
import { sendEmail } from "../utils/sendEmail";
import session from "express-session";

export const loginService=async(req: Request, res: Response,next: NextFunction)=>{
  console.log({ basic: { email:req.body.email}});
  console.log({ basic: { password:req.body.password}});
  await User.findOne({ 'basic.email': req.body.email }).then(async (user: any) => {
    console.log(user);
    if (!user) {
      return res.status(401).send({
        success: false,
        message:'Could not find user'
      }) 
    }

    console.log(user.basic.password);
    if (!compareSync(req.body.password, user.basic.password)) {
      return res.status(401).send({
        success: false,
        message:'Incorrect Password'
      })    
    }
    const payload = {
      email: await (user.email, 12),
      id:await (user.id,12)
    }
    const token = jwt.sign(payload, 'secrect', { expiresIn: '1d' });

    return res.status(200).send({
      success: true,
      message: 'Login Successfully!',
      users: user,
      token: token
    });   
  })
    
  }
 
  
export const logoutService=async(req:any, res:Response) => {
  req.session=null;
  return res.status(200).json({
    success:true,
    message:"Logout Successfully!"
  });
}

export const forgetPasswordService = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ 'basic.email': req.body.email });
    if (!user)
      return res.status(400).send("Email does not exist");

    let token = await PasswordReset.findOne({ 'basic.email': req.body.email });
    if (!token) {
      token = await new PasswordReset({
        email: req.body.email,
        token: crypto.randomBytes(16).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/forgot-password-update/${user._id}/${token.token}`;
    await sendEmail(user.basic?.email, "Password reset", link);

    res.status(200).json({
      message: "Password reset link sent to your email account."
    });
  } catch (error) {
    res.send("An error occured");
  }
};

export const passwordResetService = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(401).send("User Id does not exist");

    const passwordReset = await PasswordReset.findOne({
      token: req.body.token
    });
    if (!passwordReset) return res.status(401).send("Invalid link or expired");
    console.log(req.body.password);
    user.basic!.password= await bcrypt.hash(req.body.password, 12);
    await user.save();
    console.log(user);
    await passwordReset.delete();

    res.json({
      message: "Password reset sucessfully."
    });
  } catch (error) {
    res.send("An error occured");
  }
}

export const passwordChangeService = async (req: Request, res: Response) => {
  try {
    await User.findById(req.params.userId)
    .then(async (user: any) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Could not find user'
        })
      }

      const token= req.params.token;
      if (!token) return res.status(401).send("Unauthorized");

  
      if (!compareSync(req.body.oldPassword, user.basic.password)) {
        return res.send({
          success: false,
          message: 'Incorrect password'
        });
      }

      if(compareSync(req.body.newPassword, user.basic.password)) {
        return res.send({
          success: false,
          message: 'Current Password and New Password are same.'
        });
      }

      user.basic.password = await bcrypt.hash(req.body.newPassword, 12);
      await user.save();
      res.json({ message: "Password Change Successfully!" });
    })
  } catch (error) {
    res.send("An error occured");
  }
}
