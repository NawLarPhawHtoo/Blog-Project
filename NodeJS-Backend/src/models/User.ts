import mongoose, { Schema,model } from "mongoose";

const basicSchema = new Schema({
  name:{
    type: String,
    // required: true
  },
  email:{
    type: String,
    // required: true
  },
  password:{
    type: String,
    // required: true
  },
  
})

const contactSchema=new Schema({
  phone:{
    type: String,
    default:""
  },
  gender:{
    type: String,
    default:""
  },
  birthday:{
    type: String,
    default:""
  },
  address:{
    type: String,
    default:""
  },
  type:{
    type: String,
    enum:['Admin','User'],
    default:'User'
  },

})

const educationSchema=new Schema({
  skill:{
    type: String,
    default:""
  },
  experience:{
    type: String,
    default:""
  },

})

const userSchema=new Schema({
  basic:basicSchema,
  contact:contactSchema,
  education:educationSchema,
  
  profile:{
    type: String,
    default:""
  },
  
  created_user_id:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  updated_user_id:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  deleted_user_id:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  deleted_at:{
    type:Date
  }
},
{
  timestamps:true
}
);

export default model ("User",userSchema);
