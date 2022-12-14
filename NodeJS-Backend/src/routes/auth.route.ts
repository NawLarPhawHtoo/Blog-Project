import express from 'express';
import { createUser } from '../controllers/user.controller';
import { login,logout } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { forgotPassword, passwordReset, passwordChange} from '../controllers/auth.controller';

const router=express.Router();

router
.route('/login')
.post([
  body("email").notEmpty().withMessage("Email must not be empty"),
  body("password").notEmpty().withMessage("Password must not be empty")
],
login);

router
.route('/logout')
.post([],logout);

router
.route('/signup')
.post([
  body("name").notEmpty().withMessage("Name must not be empty"),
  body("email").notEmpty().withMessage("Email must not be empty"),
  body("password").notEmpty().withMessage("Password must not be empty")
],createUser);

router
  .route('/forgot-password')
  .post(
    [
      body("email").notEmpty().withMessage("Email must not be empty")
    ], forgotPassword);

router
  .route('/forgot-password-update')
  .post(
    [
      body("userId").notEmpty().withMessage("User Id must not be empty"),
      body("token").notEmpty().withMessage("Token must not be empty")
    ],passwordReset);

  router
  .route('/password-change/:userId/:token')
  .post(passwordChange);


export default router;