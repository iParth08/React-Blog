import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Uncategorized",
        "Agriculture",
        "Mythology",
        "Ancient Aliens",
        "Goldilock",
        "Star and Nebula",
        "Observatory",
        "Theory",
        "Space Agency",
        "Future Mission",
      ],
      message: "Invalid Category",
    },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
