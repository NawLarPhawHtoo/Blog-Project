import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  //id: String,
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    default:"",
    type: String,
  },
  content: {
    type: String
  },
  updated: {
    type: Date, default: Date.now
  },
},
  {
  timestamps:true
});

export default model ("Category",categorySchema);