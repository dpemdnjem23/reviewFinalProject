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
const crypto = require("crypto");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken, isAuthorized, checkRefreshToken, } = require("../middlewares/token");
module.exports = {
    signupControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. req.body 제대로 들어왔는지 확인 아니면 돌려보냄
        const { email, nickname, password, sex, want_region, want_vol, age, company, iscompany, } = req.body;
        console.log(email, nickname, password);
        //유저가 없다면 회원가입
        const userDB = yield User.findOne({ email: email });
        //유저가 있는경우
        if (userDB) {
            return res.status(400).send("가입된 회원");
        }
        if (!userDB) {
            crypto.randomBytes(64, (err, buf) => {
                console.log(buf);
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    const salt = buf.toString("base64");
                    crypto.pbkdf2(password, salt, 13000, 64, "sha512", (err, key) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
                            const pass = key.toString("base64");
                            console.log(pass);
                            const newUser = {
                                email: email,
                                password: pass,
                                nickname: nickname,
                                sex: sex,
                                want_region: want_region,
                                want_vol: want_vol,
                                age: age,
                                salt: salt,
                                company: company,
                                iscompany: iscompany,
                                isopen: true,
                            };
                            User.create(newUser)
                                .then((data) => {
                                if (!data) {
                                    return res.status(500).send("서버이상");
                                }
                                console.log(data);
                                return res.status(201).send("회원가입 축하");
                            })
                                .catch((err) => {
                                return res.send(err);
                            });
                        }
                    });
                }
            });
        }
    }),
    signinControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //로그인 하기위해선 아이디 비밀번호 필요
        //password는 암호화 되어 있으므로 알아내려면 salt 를 알아야한다.
        const { email, password } = req.body;
        const salt = yield User.findOne({ email: email }).select({
            _id: 1,
            salt: 1,
        });
        if (salt === null) {
            return res.status(404).send("이메일 및 비밀번호 다시쳐봐");
        }
        console.log(salt.salt);
        //userDB에서 email을 찾는다.
        crypto.pbkdf2(password, salt.salt, 13000, 64, "sha512", (err, key) => {
            const pass = key.toString("base64");
            User.findOne({ email: email, password: pass })
                .then((data) => {
                if (!data) {
                    return res.status(404).send("이메일 및 비밀번호 확인");
                }
                console.log(data);
                //회원가입
                const { email, nickname } = data;
                console.log(email, nickname);
                const user_id = data._id;
                console.log();
                const accessToken = generateAccessToken({ email, nickname, user_id });
                const refreshToken = generateRefreshToken({
                    email,
                    nickname,
                    user_id,
                });
                return res
                    // .cookie("refreshToken", refreshToken)
                    .status(200)
                    .send({ accessToken: accessToken, message: '로그인 완료 되었습니다.' });
            })
                .catch((err) => {
                console.log(err);
                return res.send(err);
            });
        });
    }),
    nickcheckControl: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //닉네임 체크 는 기존의 닉네임 db 매치후 확인한다.
        const { nickname } = req.body;
        User.findOne({ nickname: nickname }).then((data) => {
            if (!data) {
                return res.status(200).send("닉네임 사용 가능");
            }
            return res.status(400).send("이미 있는 닉네임");
        });
    }),
};
