export {};

import { String } from "aws-sdk/clients/batch";

import express from "express";
import { title } from "process";
import { BoardFree, Userdata } from "../inteface";
require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");

const { isAuthorized } = require("../middlewares/token");

module.exports = {
  //freboard
  fbimageControl: async (req: express.Request, res: express.Response) => {
    try {
      const image: any = req.files;
      const path: [string] = image.map(
        (img: { location: String }) => img.location
      );

      console.log(image, path);

      //1.가입된 유저인지확인
      //2. 유저가 아니면 작성 x
      //3.유저 라면 board 생성 할수 있ek.
      //4. img 올리는경우 안올리는경우 존재? 포스트맨에선 이미지를 함께 사용x
      const userData: Userdata = isAuthorized(req);

      if (!userData) {
        return res.status(401).send("인증 필요");
      }

      const freeboardPost = await Freeboard.create({
        user_id: userData.user_id,
        images: path,
      });

      if (!freeboardPost) {
        return res.status(400).send("잘못된 등록입니다.");
      }
      console.log(freeboardPost);
      return res.status(200).send(freeboardPost);
    } catch (err) {
      console.log(err);
      return res.status(500).send("서버 오류");
    }
  },

  //이미지 수정하기
  fbimageEditControl: async (req: express.Request, res: express.Response) => {
    try {
      const image: any = req.files;
      const path: string[] = image.map(
        (img: { location: String }) => img.location
      );

      const { freeboard_id } = req.body;
      const userData = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      //수정하고자하는 board, 수정하는 유저를 찾는다.
      const findBoard = await Freeboard.findOne({
        _id: freeboard_id,
        user_id: userData.user_id,
      });

      if (!findBoard) {
        return res.status(400).send("변경할수 없는 게시물 입니다.");
      }
      const imageUpdate = Freeboard.updateOne(
        { _id: findBoard._id },
        { images: path }
      );
      if (!imageUpdate) {
        return res.status(400).send("업데이트 실패");
      }
      console.log(imageUpdate, "updataea");
      return res.status(200).send("업데이트 성공");
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  fbcontentsControl: async (req: express.Request, res: express.Response) => {
    const { title, description } = req.body;
    try {
      const userData = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }

      const freeboardPost = await Freeboard.create({
        user_id: userData.user_id,
        title: title,
        description: description,
      });

      if (!freeboardPost) {
        return res.status(404).send("등록이 되지 않습니다.");
      }

      return res.status(200).send(freeboardPost);
    } catch (err) {
      console.log(err);
      return res.status(500).send("서버 에서 문제가발생");
    }
  },

  fblistControl: async (req: express.Request, res: express.Response) => {
    // List 를 보여준다 10개 까지, 생성된 순서대로
    // 화면에 보여질 목록의 모습은 좋아요여부(나에게만), 제목, 생성일자, 좋아요 갯수, 닉네임
  

    //페이지 네이션 화면에 10개 씩 게시판을 보여준다.
    const fbList = await Freeboard.find({})
      .limit(10)
      .sort({ createdAt: -1 })
      .select({ like: 1, title: 1, createdAt: 1, like_count: 1 })
      .populate({path:"user_id",select:{nickname:1}})


  },

  fbTopListControl: async (req: express.Request, res: express.Response) => {


  },

  fblikeControl: async (req: express.Request, res: express.Response) => {
    // 토큰이 있는 유저라면 좋아요한 게시글인지 아닌지도 보내주기
    //좋아요 클릭
  },
};
