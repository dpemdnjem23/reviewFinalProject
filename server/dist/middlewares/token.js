"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: "3h" });
    },
    generateRefreshToken: (data) => {
        return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
    },
    isAuthorized: (req, res) => {
        const authorization = req.headers['Authorization'] || req.headers['authorization'];
        //인증에실패하는경우
        if (!authorization) {
            return null;
        }
        const token = authorization.split(' ')[1];
        try {
            return verify(token, process.env.ACCESS_SECRET);
        }
        catch (err) {
            return err;
        }
    },
    // checkRefreshToken: rereshToken =>{
    //     try{
    //         return verify(refreshToken, process.env.REFRESH_SECRET);
    //     }catch(err){
    //         return err
    //     }
    // }
};
