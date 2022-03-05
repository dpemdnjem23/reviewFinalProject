export {};

import express from "express";
import { stringify } from "querystring";

import { BoardFree, Userdata } from "../inteface";
require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");
const Comment = require("../models/Freecomment");
const Child_comment = require("../models/Freechildcomment");

const { isAuthorized } = require("../middlewares/token");

module.exports = {
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
      const fb:{_id:string} = await Freeboard.findById(freeboard_id);
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
      const fb:{_id:string} = await Freeboard.findById(freeboard_id);

      const freeCommentEdit: {
        user_id: string;
        freeboard_id: string;
        comment: string;
      } = await Comment.findOneAndUpdate({ user_id: userData.user_id , freeboard_id:fb._id },{comment:comment});


      return res.status(200).send(freeCommentEdit)
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
        comment_id
      }: { freeboard_id: string; comment: string ,comment_id:string} = req.body;

      const userData: { user_id: string } = isAuthorized(req, res);

      if (!userData) {
        return res.status(401).send("회원가입 필요");
      }

      const fb:{_id:string} = await Freeboard.findById(freeboard_id);
// child commnet를 남기는 경우, 지우면 댓글만 삭제됨
//이코드는 내가 프리보드에 남긴 내 코멘트를 삭제한다. child도 지워짐 db자체에서 삭제
//개선점 => child는 냅두고 코멘트만 삭제 할수도잇을까?

      const freeCommentDelete = await Comment.deleteOne({user_id:userData.user_id,freeboard_id:fb._id,_id:comment_id})

      return res.status(200).send(freeCommentDelete)


    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
