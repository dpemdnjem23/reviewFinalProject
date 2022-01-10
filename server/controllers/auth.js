require("dotenv").config();
const crypto = require("crypto");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  isAuthorized,
  checkRefreshToken,
} = require("../middlewares/token");


signupControl: async (req, res) => {
    // 1. req.body 제대로 들어왔는지 확인 아니면 돌려보냄
    const {
      email,
      nickname,
      password,
      sex,
      want_region,
      want_vol,
      age,
      company,
      iscompany,
    } = req.body;

    console.log("req.body", req.body);

//유저가 없다면 회원가입
    const userDB = User.find({email:email})
    

}