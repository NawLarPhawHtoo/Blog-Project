import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { UserCreate } from "../interfaces/user";
import bcrypt from "bcrypt";
import moment from "moment";

export const getUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: any = await User.find();
    if (!users) {
      return res.status(404).send({
        error: "User not found",
      });
    } else {
      res.json({
        message: "Users Fetched",
        data: users,
        status: 1,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const findUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findById(req.params.id);
    if (!user) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }
    res.json({
      data: user,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

export const createUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(JSON.stringify(req.body.basic));
    // console.log(req.body.profile);
    // console.log(JSON.stringify(req.body.contact));
    // console.log(JSON.stringify(req.body.education));
    
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 401;
      throw error;
    }

    let profile: string = req.body.profile;
    if (req.file) {
      profile = req.file.path.replace("\\", "/");
    }

    let basic = {
      name: req.body.name,
      email: req.body.email,
      // password: req.body.password
      password:await bcrypt.hash(req.body.password, 12)
    };

    let contact = {
      birthday: req.body.birthday,
      gender: req.body.gender,
      address: req.body.address,
      type: req.body.type,
      phone: req.body.phone
    };

    let education={
      skill:req.body.skill,
      experience:req.body.experience
    };

    const userTo :UserCreate= {
      basic,
      profile: profile,
      contact,
      education,
      created_user_id: req.body.created_user_id,
    };
    const user = new User(userTo);
    const result = await user.save();
    res.status(201).json({
      message: "Created User successfully!",
      data: result,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }

    let profile: string = req.body.profile;
    if (req.file) {
      {
        profile = req.file.path.replace("\\", "/");
      }
      if (profile) {
        user.profile = profile;
      }
    }
    let basic = {
      name: req.body.name,
      email: req.body.email,
      password:await bcrypt.hash(req.body.password, 12)
    };

    let contact = {
      birthday: req.body.birthday,
      gender: req.body.gender,
      address: req.body.address,
      type: req.body.type,
      phone: req.body.phone
    };

    let education={
      skill:req.body.skill,
      experience:req.body.experience
    };
      user.basic= basic;
      console.log(user.basic);
      user.contact= contact;
      console.log(user.contact);
      user.education= education;
      console.log(user.education);  
    
    user.profile = profile;
    user.created_user_id = req.body.created_user_id;
    user.updated_user_id = req.body.updated_user_id;

    const result = await user.save();
    res.json({
      message: "Updated user successfully!",
      data: result,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }
    res.json({
      message: "User deleted successfully!",
      data: user,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};


export const passwordChangeService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.id);
  const user:any = await User.findById(req.params.id);
  console.log(user);
    const { oldPassword, newPassword, confirmPassword } = req.body;
    console.log(oldPassword);
    console.log(newPassword);
    console.log(confirmPassword);

    //Check required fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.json({ message: "Please fill in all fields." });
    }
    
    //Check passwords match
    if (newPassword !== confirmPassword) {
      res.json({ message: "New password do not match." });
    } else {
      //Validation Passed
      const isMatch = await bcrypt.compare(oldPassword, user.basic.password);
      console.log(user.basic.password);
      console.log(isMatch);
        if (isMatch) {
          //Update password for user with new password
          bcrypt.genSalt(12, (err, salt) =>
            bcrypt.hash(newPassword,salt, (err, hash) => {
              if (err) {
                throw err;
              }
              user.password = hash;
              user.save(); 
            })
          );
          res.json({ message: "Password Successfully Updated!", data: user, status: 1 });
        
        } else {
          res.json({ message: "Current Password is not match." })
          
        }
    }
  } catch (err) {
    res.json({ message: "Password does not match" });
   
  }
}
