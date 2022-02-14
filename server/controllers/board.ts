export{}
import express from 'express'
import { BoardFree, image } from '../inteface';
require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");


const {isAuthorized} = require("../middlewares/token");

module.exports = {
//freboard
fbregisterControl: async (req:express.Request,res:express.Response) =>{
 
    const {title,description,user_id}:BoardFree =req.body

  const image = req.files;
  const path : = image.map((img:any) => img.location);

//1.가입된 유저인지확인
//2. 유저가 아니면 작성 x
//3.유저 라면 board 생성 할수 있ek.
//4. img 올리는경우 안올리는경우 존재?

const userData:any = isAuthorized(req)

if(!userData){
    return res.stauts(401).send('회원가입 필요')
}
if(image===undefined){
    return res.status(400).send('이미지')
}

Freeboard.create({user_id:user_id,title:title,description:description,images:path}).then((data:string) =>{
if(!data){
    return res.status(500).send(data)
}
return res.status(200).send(data)

}).catch((err:Error) =>{
    return res.send(err)
})


},
fbinfoControl: async(req:express.Request,res:express.Response) =>{

const userData = isAuthorized(req,res)
if(!userData){
    return res.status(401).send('회원가입 필요')
}


},



// fbimageEditControl: async (req,res) =>{
// //없앨수도 있음
//     const image = req.files;
//     const path = image.map(img => img.location);

//     const userData = isAuthorized(req,res)

//     if(!userData){
//         return res.status(401).send('회원가입 필요')
//     }

//     Freeboard.updateOne({images:path}).then(data =>{
//         if(!data){

//         }
//         return res.status(400).send(data)
//     })
   
    

// }


};