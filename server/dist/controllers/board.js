"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");
const { isAuthorized } = require("../middlewares/token");
module.exports = {
    //freboard
    fbregisterControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description } = req.body;
        try {
            const image = req.files;
            const path = image.map((img) => img.location);
            console.log(image, path);
            //1.가입된 유저인지확인
            //2. 유저가 아니면 작성 x
            //3.유저 라면 board 생성 할수 있ek.
            //4. img 올리는경우 안올리는경우 존재? 포스트맨에선 이미지를 함께 사용x
            const userData = isAuthorized(req);
            if (!userData) {
                return res.status(401).send('인증 필요');
            }
            console.log(userData.user_id, 'sadfsfads');
            const freeboardPost = yield Freeboard.create({ user_id: userData.user_id, title: title, description: description, image: path });
            console.log(freeboardPost, 'sadfs');
            if (!freeboardPost) {
                return res.status(400).send("잘못된 등록입니다.");
            }
            return res.status(200).send(Freeboard);
        }
        catch (err) {
            return res.status(500).send(err);
        }
    }),
    fbinfoControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = isAuthorized(req, res);
        if (!userData) {
            return res.status(401).send('회원가입 필요');
        }
    }),
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
