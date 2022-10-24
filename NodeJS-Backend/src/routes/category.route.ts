import express from 'express';
import { getCategories, findCategory,createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
const router=express.Router();

router
.route("/")
.get(getCategories)

router
.route("/create") 
.post(createCategory)     

router
.route("/read/:id") 
.get(findCategory)

router
.route("/update/:id")
.put(updateCategory)

router
.route("/delete/:id")
.delete(deleteCategory)

export default router;