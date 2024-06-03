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
        "News and Discoveries",
        "Space Exploration",
        "Ancient Aliens",
        "Astrobiology",
        "Astronomical Events",
        "Cosmology",
        "Astrophysics",
        "Space Technology",
        "Space History",
        "Amateur Astronomy",
        "Future Mission",
      ],
      message: "Invalid Category",
    },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
