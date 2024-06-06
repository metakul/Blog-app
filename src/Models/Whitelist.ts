import mongoose, { Schema } from "mongoose";

const WhitelistSchema: Schema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
 
  },

  { timestamps: true }
);
const Whitelist = mongoose.model<any>("whitelist", WhitelistSchema);
export default Whitelist;
