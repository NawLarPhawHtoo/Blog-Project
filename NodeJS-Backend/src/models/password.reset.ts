import mongoose,{ Schema, model } from 'mongoose';

const passwordResetSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  user_id:{
    type:Schema.Types.ObjectId,
  },
  token: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  }
);

export default model("PasswordReset", passwordResetSchema)