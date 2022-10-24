import express from 'express';
import { getUsers,findUser,createUser,updateUser,deleteUser ,passwordChange} from '../controllers/user.controller';

const router=express.Router();

router
.route("/")
.get(getUsers)

router
.route("/create") 
.post(createUser)     

router
.route("/read/:id") 
.get(findUser)

router
.route("/update/:id")
.put(updateUser)

router
.route("/delete/:id")
.delete(deleteUser)

router
  .route("/password-change/:id")
  .post(passwordChange)


export default router;
