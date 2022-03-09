export {};

import express from "express";

import { BoardFree, Userdata } from "../inteface";
require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");
const Comment = require("../models/Freecomment");
const Child_comment = require("../models/Freechildcomment");

const { isAuthorized } = require("../middlewares/token");

module.exports = {
  //댓글+대댓글 보여주기

  fbcommentControl: async (req: express.Request, res: express.Response) => {
    try {
      //회원만 댓글을 달수 있다.
      //
      const {
        freeboard_id,
        comment,
      }: { freeboard_id: string; comment: string } = req.body;

      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      const fb: { _id: string } = await Freeboard.findById(freeboard_id);
      console.log(fb);
      //댓글에 필요한것 작성 날짜, 유저이름, 댓글 내용
      if (!fb) {
        return res.status(400).send("게시판 들어가서 댓글써야함");
      }
      //save는 수정도 가능함
      const freeComment: {
        user_id: string;
        freeboard_id: string;
        commnet: string;
      } = await Comment.create({
        user_id: userData.user_id,
        freeboard_id: freeboard_id,
        comment: comment,
      });

      return res.status(201).send(freeComment);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  fbcommenteditControl: async (req: express.Request, res: express.Response) => {
    try {
      const {
        freeboard_id,
        comment,
      }: { freeboard_id: string; comment: string } = req.body;

      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      const fb: { _id: string } = await Freeboard.findById(freeboard_id);

      const freeCommentEdit: {
        user_id: string;
        freeboard_id: string;
        comment: string;
      } = await Comment.findOneAndUpdate(
        { user_id: userData.user_id, freeboard_id: fb._id },
        { comment: comment }
      );

      return res.status(200).send(freeCommentEdit);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  fbcommentdeleteControl: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const {
        freeboard_id,
        comment,
        comment_id,
      }: { freeboard_id: string; comment: string; comment_id: string } =
        req.body;

      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }

      const fb: { _id: string } = await Freeboard.findById(freeboard_id);
      // child commnet를 남기는 경우, 지우면 댓글만 삭제됨
      // 만약에 childcomment가 있는경우에 삭제된 경우 -> 댓글만 삭제되고 childcomment는 남겨야 한다.

      //만약에 childcomment가 없는경우 댓글을 통째로 삭제한다.

      const freeCommentDelete = await Comment.deleteOne({
        user_id: userData.user_id,
        freeboard_id: fb._id,
        _id: comment_id,
      });

      return res.status(200).send(freeCommentDelete);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  fbchildcommentControl: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      //회원만 댓글을 달수 있다. childcomment 를 달 수 있다. 대댓글은 댓글에 [] 형태로 들어간다.
      // chid는 프리보드, id childid , child commnet depth 로 구성

      const {
        freeboard_id,
        childcomment,
        freecomment_id,
      }: {
        freeboard_id: string;
        childcomment: string;
        freecomment_id: string;
      } = req.body;

      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }

    

      //댓글에 필요한것 작성 날짜, 유저이름, 댓글 내용
      //대댓글을 눌러 댓글을 단다.
      //child => comment
      // const fbchild: {
      //   _id:string
      //   user_id: string;
      //   freeboard_id: string;
      //   freecomment_id: string;
      // } = await Child_comment.create({
      //   user_id: userData.user_id,
      //   freeboard_id: fb._id,
      //   freecomment_id: freecomment_id,
      //   childcomment: childcomment,
      // });
      // console.log(fbchild._id)

      //프리보드에 들어와서 => 댓글창 => 대댓글을클릭 => 대댓글을 입력하고, 완료
      //대댓글이 생기려면, 있는 유저여야한다.
      //대댓글 만들고 depth 추
      // const fb: { _id: string } = await Freeboard.findOne({
      //   freeboard_id: freeboard_id,
      // });
      // console.log(fb._id, "fb");
// 

// console.log(Child_comment)

      const commentinchild: { freeboard_id: string; user_id: string ,freecommnet:string,child_comment:string} =
        //대댓글을만든다 만약에 a댓글에 대댓을 달면 depth+1 depth=1인 상황 depth=1인 곳에 댓글을 달면 depth=2
        //따라서 +1을 무조건하는게 아니라 원래가지고 있는 depth에 +1을 해서 생성한다.
        await Child_comment.create({
          freeboard_id: freeboard_id,
          user_id: userData.user_id,
          freecomment_id: freecomment_id,
          child_comment: childcomment,
        });
      //대댓글 생성 ,
    
      // const commentinchilecomment: { freecomment_id: string } =
      //   await Comment.findOneAndUpdate({ freecomment_id: freecomment_id },{$push:{freechildcomments:commentchild}});

      //freechild를 푸쉬하게시
      // console.log(commentinchilecomment)

      // const fbcomment =await Comment.findOneAndUpdate({})

      //save는 수정도 가능함

      return res.status(201).send(commentinchild);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  fbchildeditControl: async (req: express.Request, res: express.Response) => {
    try {
      //회원만 댓글을 달수 있다.
      //
      const {
        freeboard_id,
        comment,
      }: { freeboard_id: string; comment: string } = req.body;

      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      const fb: { _id: string } = await Freeboard.findById(freeboard_id);
      console.log(fb);
      //댓글에 필요한것 작성 날짜, 유저이름, 댓글 내용
      if (!fb) {
        return res.status(400).send("게시판 들어가서 댓글써야함");
      }
      //save는 수정도 가능함
      const freeComment: {
        user_id: string;
        freeboard_id: string;
        commnet: string;
      } = await Comment.create({
        user_id: userData.user_id,
        freeboard_id: freeboard_id,
        comment: comment,
      });

      return res.status(201).send(freeComment);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  fbchilddeleteControl: async (req: express.Request, res: express.Response) => {
    try {
      //회원만 댓글을 달수 있다.
      //
      const {
        freeboard_id,
        comment,
      }: { freeboard_id: string; comment: string } = req.body;

      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }
      const fb: { _id: string } = await Freeboard.findById(freeboard_id);
      console.log(fb);
      //댓글에 필요한것 작성 날짜, 유저이름, 댓글 내용
      if (!fb) {
        return res.status(400).send("게시판 들어가서 댓글써야함");
      }
      //save는 수정도 가능함
      const freeComment: {
        user_id: string;
        freeboard_id: string;
        commnet: string;
      } = await Comment.create({
        user_id: userData.user_id,
        freeboard_id: freeboard_id,
        comment: comment,
      });

      return res.status(201).send(freeComment);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
