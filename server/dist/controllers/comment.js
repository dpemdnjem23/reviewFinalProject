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
