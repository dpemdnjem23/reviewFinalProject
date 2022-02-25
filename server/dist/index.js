"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// const multer = require("multer");
// const upload = multer({dest: "uploads/"});
const DB = require("./config/config");
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const mailRouter = require("./routes/mail");
const mapRouter = require("./routes/map");
const imageRouter = require("./routes/image");
require("dotenv").config();
//use modules
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static("public"));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(cookieParser());
DB();
app.get("/", (req, res) => {
    return res.status(200).send("hello world....!!");
});
//routes
// app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/board", boardRouter);
// app.use("/comment", commentRouter);
// app.use("/mail", mailRouter);
// app.use("/map", mapRouter);
// app.use("/image", imageRouter);
//server
const HTTPS_PORT = 8000;
//인증서 없는경우
app.listen(HTTPS_PORT, () => {
    console.log(`      🚀 Server is starting on http ${HTTPS_PORT}`);
});
module.exports = app;
