import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  user_name: String,
  full_name: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
});

export default model ('User', userSchema)