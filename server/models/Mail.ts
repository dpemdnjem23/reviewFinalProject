export{}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailSchema = new Schema(
  {
    writer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    writer_nickname: {
      type: String,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mail", mailSchema);