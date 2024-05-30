import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
    default: "Introduce yourself in short 🤞🤞",
  },
  post_count: {
    type: Number,
    default: 0,
  },
});

export default model("User", userSchema);
