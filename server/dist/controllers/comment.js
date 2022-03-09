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
const Comment = require("../models/Freecomment");
const Child_comment = require("../models/Freechildcomment");
const { isAuthorized } = require("../middlewares/token");
module.exports = {
    //댓글+대댓글 보여주기
    fbcommentControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //회원만 댓글을 달수 있다.
            //
            const { freeboard_id, comment, } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            const fb = yield Freeboard.findById(freeboard_id);
            console.log(fb);
            //댓글에 필요한것 작성 날짜, 유저이름, 댓글 내용
            if (!fb) {
                return res.status(400).send("게시판 들어가서 댓글써야함");
            }
            //save는 수정도 가능함
            const freeComment = yield Comment.create({
                user_id: userData.user_id,
                freeboard_id: freeboard_id,
                comment: comment,
            });
            return res.status(201).send(freeComment);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }),
    fbcommenteditControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { freeboard_id, comment, } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            const fb = yield Freeboard.findById(freeboard_id);
            const freeCommentEdit = yield Comment.findOneAndUpdate({ user_id: userData.user_id, freeboard_id: fb._id }, { comment: comment });
            return res.status(200).send(freeCommentEdit);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }),
    fbcommentdeleteControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { freeboard_id, comment, comment_id, } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            const fb = yield Freeboard.findById(freeboard_id);
            // child commnet를 남기는 경우, 지우면 댓글만 삭제됨
            // 만약에 childcomment가 있는경우에 삭제된 경우 -> 댓글만 삭제되고 childcomment는 남겨야 한다.
            //만약에 childcomment가 없는경우 댓글을 통째로 삭제한다.
            const freeCommentDelete = yield Comment.deleteOne({
                user_id: userData.user_id,
                freeboard_id: fb._id,
                _id: comment_id,
            });
            return res.status(200).send(freeCommentDelete);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }),
    fbchildcommentControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //회원만 댓글을 달수 있다. childcomment 를 달 수 있다. 대댓글은 댓글에 [] 형태로 들어간다.
            // chid는 프리보드, id childid , child commnet depth 로 구성
            const { freeboard_id, childcomment, freecomment_id, } = req.body;
            const userData = isAuthorized(req, res);
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
            const commentinchild = 
            //대댓글을만든다 만약에 a댓글에 대댓을 달면 depth+1 depth=1인 상황 depth=1인 곳에 댓글을 달면 depth=2
            //따라서 +1을 무조건하는게 아니라 원래가지고 있는 depth에 +1을 해서 생성한다.
            yield Child_comment.create({
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
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }),
    fbchildeditControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //회원만 댓글을 달수 있다.
            //
            const { freeboard_id, comment, } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            const fb = yield Freeboard.findById(freeboard_id);
            console.log(fb);
            //댓글에 필요한것 작성 날짜, 유저이름, 댓글 내용
            if (!fb) {
                return res.status(400).send("게시판 들어가서 댓글써야함");
            }
            //save는 수정도 가능함
            const freeComment = yield Comment.create({
                user_id: userData.user_id,
                freeboard_id: freeboard_id,
                comment: comment,
            });
            return res.status(201).send(freeComment);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }),
    fbchilddeleteControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //회원만 댓글을 달수 있다.
            //
            const { freeboard_id, comment, } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            const fb = yield Freeboard.findById(freeboard_id);
            console.log(fb);
            //댓글에 필요한것 작성 날짜, 유저이름, 댓글 내용
            if (!fb) {
                return res.status(400).send("게시판 들어가서 댓글써야함");
            }
            //save는 수정도 가능함
            const freeComment = yield Comment.create({
                user_id: userData.user_id,
                freeboard_id: freeboard_id,
                comment: comment,
            });
            return res.status(201).send(freeComment);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }),
};
