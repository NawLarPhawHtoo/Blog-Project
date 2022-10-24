import express, { application, Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import multer, { FileFilterCallback } from 'multer';
import { v4} from 'uuid';
import passport from "passport";
require('./src/config/passport');
import userRoute from './src/routes/user.route';
import authRoute from './src/routes/auth.route';
import postRoute from './src/routes/post.route';
import categoryRoute from './src/routes/category.route';


dotenv.config();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "apiuploads");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
    // cb(null, file.fieldname + '-' + Date.now());
  },
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

mongoose.connect(`${process.env.MONGO_URL}`,{},err=>{
  if(!err){
    console.log('Database connection successed!');
  }else{
    console.log('Database connection failed!' + err);
  }
})


const app:Express = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(multer({ storage: fileStorage, fileFilter }).single("profile"));
app.use("/apiuploads", express.static("apiuploads"));
app.use(passport.initialize());


app.use('/api/users',userRoute);
app.use('/api',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/category',categoryRoute);

app.get('/', (req: Request, res: Response) => {
  res.send("/Hello Welcome");
});


const port = process.env.PORT;
app.listen(port,()=>{
  console.log(`Listening on port ${port}`);
})


