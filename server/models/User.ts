var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String,
    },
    nickname: {
      type: String,
    },
    kakao_id: {
      type: String,
    },
    google_id: {
      type: String,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    sex: {
      type: String,
    },
    want_region: {
      type: String,
    },
    want_vol: {
      type: String,
    },
    age: {
      type: String,
    },
    company: {
      type: String,
    },
    iscompany: {
      type: Boolean,
    },
    isopen: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    authcode: {
      type: String,
    },
  },
  {timestamps: true},
);

// userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);