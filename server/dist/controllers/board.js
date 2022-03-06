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
const { isAuthorized } = require("../middlewares/token");
module.exports = {
    //freboard
    fbimageControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const image = req.files;
            const path = image.map((img) => img.location);
            //1.가입된 유저인지확인
            //2. 유저가 아니면 작성 x
            //3.유저 라면 board 생성 할수 있ek.
            //4. img 올리는경우 안올리는경우 존재? 포스트맨에선 이미지를 함께 사용x
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("인증 필요");
            }
            const freeboardPost = yield Freeboard.create({
                user_id: userData.user_id,
                images: path,
            });
            if (!freeboardPost) {
                return res.status(400).send("잘못된 등록입니다.");
            }
            return res.status(200).send(freeboardPost);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 오류");
        }
    }),
    //이미지 수정하기
    fbimageEditControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const image = req.files;
            const path = image.map((img) => img.location);
            const { _id } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            //수정하고자하는 board, 수정하는 유저를 찾는다.
            const findBoard = yield Freeboard.findOne({
                _id: _id,
                user_id: userData.user_id,
            });
            if (!findBoard) {
                return res.status(400).send("변경할수 없는 게시물 입니다.");
            }
            const imageUpdate = Freeboard.updateOne({ _id: findBoard._id }, { images: path });
            if (!imageUpdate) {
                return res.status(400).send("업데이트 실패");
            }
            console.log(imageUpdate, "updataea");
            return res.status(200).send("업데이트 성공");
        }
        catch (err) {
            return res.status(500).send(err);
        }
    }),
    fbcontentsControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description } = req.body;
        try {
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            console.log(userData);
            const freeboardPost = yield Freeboard.create({
                user_id: userData.user_id,
                title: title,
                description: description,
            });
            if (!freeboardPost) {
                return res.status(404).send("등록이 되지 않습니다.");
            }
            return res.status(200).send(freeboardPost);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 에서 문제가발생");
        }
    }),
    fblistControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // List 를 보여준다 10개 까지, 생성된 순서대로
        // 화면에 보여질 목록의 모습은 좋아요여부(나에게만), 제목, 생성일자, 좋아요 갯수, 닉네임
        //페이지 네이션 화면에 10개 씩 게시판을 보여준다.
        try {
            const fbList = yield Freeboard.find({})
                .limit(10)
                .sort({ createdAt: -1 })
                .select({ like: 1, title: 1, createdAt: 1, like_count: 1, user_id: 1 })
                .populate({ path: "user_id", select: { nickname: 1 } });
            if (!fbList) {
                return res.status(404).send("리스트를 불러올수 없습니다.");
            }
            return res.status(200).send(fbList);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 에서 문제가발생");
        }
    }),
    fbTopListControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //좋아요 탑 3 게시판노출 , like_count 가 큰 순서대로
        try {
            const fbTopThree = yield Freeboard.find({})
                .limit(3)
                .sort({ like_count: -1 })
                .select({ like: 1, title: 1, createdAt: 1, like_count: 1 })
                .populate({ path: "user_id", select: { nickname: 1 } });
            if (!fbTopThree) {
                return res.status(404).send("리스트를 불러올수 없습니다.");
            }
            return res.status(200).send(fbTopThree);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 에서 문제가발생");
        }
    }),
    fblikeControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //내가 좋아요를 눌렀다면 표시가 되어야한다.
        // 좋아요 도 체크해야하낟.
        //좋아요 체크하기
        try {
            // const {_id } =req.body
            const { _id } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            //좋아요를 누르면 특정한 board에 특정한 id가 들어간다. 업데이트 된다.. 여러명이 누르는경우?
            // 내가 선택한 freeboard에 내 아이디가 추가되어야한다.
            // console.log(!dislikefb);
            //문제점 이전에 사용했던 결과 값이 적용이 되어서 그 해당값이 표시됨
            const likeUser = yield Freeboard.findOne({
                _id: _id,
                like: userData.user_id,
            });
            console.log(likeUser, "likeUser");
            const dislikefb = yield Freeboard.updateOne({ like: userData.user_id }, { $pull: { like: userData.user_id }, $inc: { like_count: -1 } });
            // const s = await Freeboard.
            if (likeUser === null) {
                const likefb = yield Freeboard.updateOne({ _id: _id }, { $push: { like: userData.user_id }, $inc: { like_count: 1 } }, { upsert: true });
                if (!likefb) {
                    return res.status(400).send("좋아요 추가가 안된다.");
                }
                console.log(likefb);
                return res.status(201).send({ message: "likefb", data: likefb });
            }
            // return res.status(400).send(dislikefb);
            // console.log('err')
            console.log(dislikefb);
            return res.status(200).send(dislikefb);
            //like의 들어가있는경우 한번더 누르면 좋아요 삭제, like_count 감소
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 에서 문제가발생");
        }
    }),
    fbinfoControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //프리보드를 클릭하면 내용과 좋아요를 보여줘야한다.
        //만약 내꺼일경우 내용뿐만아니라 다른것도 보여줘야한다.
        try {
            const { freeboard_id } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            const fb = yield Freeboard.findById(freeboard_id);
            console.log(fb);
            //같은
            const commentinfo = yield Comment.find({ freeboard_id: fb._id });
            console.log(commentinfo);
            if (!fb) {
                return res.status(400).send('존재하지 않는 게시물');
            }
            if (!commentinfo) {
                return res.status(400).send('댓글 존재하지 않습니다.');
            }
            return res.status(200).send({ fb: fb, co: commentinfo });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 에서 문제가 발생");
        }
    }),
    fbeditControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //포스트와 유사
        const { _id, title, description } = req.body;
        try {
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            //있는 프리보드와, 내것만 수정가능
            const editContent = yield Freeboard.findOneAndUpdate({ _id: _id, user_id: userData.user_id }, { title: title, description: description });
            if (!editContent) {
                return res.status(400).send('수정되지 않았습니다.');
            }
            return res.status(200).send(editContent);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 에서 문제가 발생");
        }
    }),
    fbdeleteControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //fb 삭제 => 할때는 코멘트도 같이 삭제되어야한다.
        // 내 프리보드만 삭제 가능하다.
        try {
            const { freeboard_id } = req.body;
            const userData = isAuthorized(req, res);
            if (!userData) {
                return res.status(401).send("회원가입 필요");
            }
            // 만약에 게시글이 삭제된경우 에도 comment 는 삭제되어야한다.
            const fb = yield Freeboard.findOne({ _id: freeboard_id });
            const deletefb = yield Freeboard.deleteOne({ user_id: userData.user_id, _id: freeboard_id });
            if (!deletefb) {
                return res.status(400).send('삭제할 수 없습니다.');
            }
            const deletecomment = yield Comment.deleteOne({ user_id: userData.user_id, _id: freeboard_id, freeboard_id: fb._id });
            if (!deletecomment) {
                return res.status(400).send('삭제할 수 없습니다.');
            }
            return res.status(200).send('삭제');
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("서버 에서 문제가 발생");
        }
    }),
};
