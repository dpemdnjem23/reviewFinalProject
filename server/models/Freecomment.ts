export {};
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var freechildcommentSchema = require("./Freechildcomment");

const freecommentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    freeboard_id: {
      type: Schema.Types.ObjectId,
      ref: "Freeboard",
    },
    
    comment: {
      type: String,
      maxLength: 1000,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
    freechildcomments: {
      type:[freechildcommentSchema],
      default:[]
    
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Freecomment", freecommentSchema);
