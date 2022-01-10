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
  const userDB = User.findOne({ email: email });
  //유저가 있는경우
  if (userDB) {
    return res.status(400).send("가입된 회원");
  }

  if (!userDB) {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const salt = buf.toString("base64");
        crypto.pbkdf2(password, salt, 13000, 64, "sha512", (err, key) => {
          if (err) {
            console.lof(err);
            return;
          } else {
            const pass = key.toString("base64");
          
          const newUser = {
            email: email,
            password: pass,
            nickname: nickname,
            sex: sex,
            want_region: want_region,
            want_vol: want_vol,
            age: age,
            salt: salt,
            company: company,
            iscompany: iscompany,
            isopen: true,
          };
           User.create({newUser}).then(data =>{
               if(!data){
                   return res.status(500).send('서버이상')
               }

               return res.status(201).send('회원가입 축하')
           }).catch(err=>{
               return res.send(err)
        
           })
        }

        });
      }
    });
  }

};
