require("dotenv").config();

import express from "express";
import { send } from "process";
const User = require("../models/User");
const Mail = require("../models/Mail");
const { isAuthorized } = require("../middlewares/token");

module.exports = {
  mailregisterControl: async (req: express.Request, res: express.Response) => {
    //1.보내는 유저인증
    //2. 닉네임 체크되서 온 것을 찾ㅈ아서 쪽지 바등ㄹ 유저정보접근
    //3. 받는 유저에 보내는 유저 아디 userData_id와 text등록

    const { nickname, text }: { nickname: string; text: string } = req.body;
    const userData = isAuthorized(req, res);
    if (!userData) {
      return res.status(401).send("회원가입 필요");
    }
    //nickname으로 찾는다. 메일을 보낼때
    const mailreceiver = await User.findOne({ nickname: nickname });

    if (!mailreceiver) {
      return res.status(400).send("쪽지 보내는 대상이 존재하지 않는다.");
    }

    const sendMail = await Mail.create({
      writer_id: userData.user_id,
      writer_nickname: userData.nickcname,
      receiver_id:mailreceiver._id,
      text:text
    });
    if(!sendMail){
        return res.status(400).send('쪽지보내는데 실패')
    }

return res.status(201).send(sendMail)

  },
};
