export {};




  import { UserData } from "aws-sdk/clients/ec2";
import express from "express";

import { BoardFree, Userdata } from "../inteface";
require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");

const { isAuthorized } = require("../middlewares/token");

module.exports = {
  //freboard
  fbimageControl: async (req: express.Request, res: express.Response) => {
    try {
      const image:any= req.files;
  
      const path: [string] = image.map(
        (img: { location: string }) => img.location
      );

   

      //1.가입된 유저인지확인
      //2. 유저가 아니면 작성 x
      //3.유저 라면 board 생성 할수 있ek.
      //4. img 올리는경우 안올리는경우 존재? 포스트맨에선 이미지를 함께 사용x
      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("인증 필요");
      }

      const freeboardPost:{user_id:string,images:string} = await Freeboard.create({
        user_id: userData.user_id,
        images: path,
      });

      if (!freeboardPost) {
        return res.status(400).send("잘못된 등록입니다.");
      }
   
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

      const { _id }:BoardFree= req.body;
     const userData: Userdata = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      //수정하고자하는 board, 수정하는 유저를 찾는다.
      const findBoard:BoardFree = await Freeboard.findOne({
        _id: _id,
        user_id: userData.user_id,
      });

      if (!findBoard) {
        return res.status(400).send("변경할수 없는 게시물 입니다.");
      }
      const imageUpdate:BoardFree = Freeboard.updateOne(
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
    const { title, description }:BoardFree = req.body;
    try {
      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      console.log(userData)

      const freeboardPost:BoardFree = await Freeboard.create({
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
    try {
      const fbList:BoardFree = await Freeboard.find({})
        .limit(10)
        .sort({ createdAt: -1 })
        .select({ like: 1, title: 1, createdAt: 1, like_count: 1,user_id:1 })
        .populate({ path: "user_id", select: { nickname: 1 } });

      if (!fbList) {
        return res.status(404).send("리스트를 불러올수 없습니다.");
      }
      return res.status(200).send(fbList);
    } catch (err) {
      console.log(err);
      return res.status(500).send("서버 에서 문제가발생");
    }
  },

  fbTopListControl: async (req: express.Request, res: express.Response) => {
    //좋아요 탑 3 게시판노출 , like_count 가 큰 순서대로

    try {
      const fbTopThree:BoardFree = await Freeboard.find({})
        .limit(3)
        .sort({ like_count: -1 })
        .select({ like: 1, title: 1, createdAt: 1, like_count: 1 })
        .populate({ path: "user_id", select: { nickname: 1 } });

      if (!fbTopThree) {
        return res.status(404).send("리스트를 불러올수 없습니다.");
      }
      return res.status(200).send(fbTopThree);
    } catch (err) {
      console.log(err);
      return res.status(500).send("서버 에서 문제가발생");
    }
  },

  fblikeControl: async (req: express.Request, res: express.Response) => {
    //내가 좋아요를 눌렀다면 표시가 되어야한다.
    // 좋아요 도 체크해야하낟.

    //좋아요 체크하기
    try {
      // const {_id } =req.body
      const { _id }:{_id:string} = req.body;
      const userData: {user_id:string} = isAuthorized(req, res);
     
      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      //좋아요를 누르면 특정한 board에 특정한 id가 들어간다. 업데이트 된다.. 여러명이 누르는경우?
      // 내가 선택한 freeboard에 내 아이디가 추가되어야한다.
console.log(userData.user_id)

const fb:any = await Freeboard.findOneAndUpdate({_id:_id},{$push:{like:"621a4e528d80782fc95319d5"}},{upsert:true}

).exec()

//중복방지 해야한다.


// fb.like.push([userData.user_id])

    //   const fbCheckLike = await Freeboard.updateOne({_id:_id
    //   },{$push:{like:userData.user_id}})
   
        
    //   .populate('like')
      return res.status(200).send(fb);

    } catch (err) {
      console.log(err);
      return res.status(500).send("서버 에서 문제가발생");
    }

    // 토큰이 있는 유저라면 좋아요한 게시글인지 아닌지도 보내주기
    //좋아요 클릭
  },
};
