import mongoose, { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    autopopulate: true
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  reference: {
    type: String,
  },
  postImage: {
    type: String,
    default:''
  },
  created: { type: Date },
  updated: { type: Date, default: Date.now },
},
  {
    timestamps: true
  });
  postSchema.plugin(require('mongoose-autopopulate'));
  export default model ("Post",postSchema);