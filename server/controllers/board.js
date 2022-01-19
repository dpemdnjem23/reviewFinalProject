require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const {isAuthorized} = require("../middlewares/token");

module.exports = {
//freboard
fbregisterControl: async(req,res) =>{
const image = req.files;
const path = image.map(img => img.location);

//1.가입된 유저인지확인
//2. 유저가 아니면 작성 x
//3.유저 라면 board 생성 할수 있ek.
//4. img 올리는경우 안올리는경우 존재?

const userData = isAuthorized(req,res)

if(!userData){
    return res.stauts(401).send('회원가입 필요')
}
if(image===undefined){
    return res.status(400).send('이미지')
}

// const createImages = await Freeboard.create({image:path}) 



}

};