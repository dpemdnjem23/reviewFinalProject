export {};

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const freeboardSchema = new Schema(
  {
    like: [{ type: Schema.Types.ObjectId, ref: "User" }],
    like_count: {
      type: Number,
      default: 0,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    images: {
      type: Array,
    },
    isopen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Freeboard", freeboardSchema);
