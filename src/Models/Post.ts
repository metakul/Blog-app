import mongoose, { Schema } from "mongoose";
import { Ipost } from "../Types/Ipost";
const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    cryptoSymbol: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const Post = mongoose.model<Ipost>("Post", PostSchema);
export default Post;
