"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    email: {
        type: String,
    },
    nickname: {
        type: String,
    },
    kakao_id: {
        type: String,
    },
    google_id: {
        type: String,
    },
    password: {
        type: String,
    },
    salt: {
        type: String,
    },
    sex: {
        type: String,
    },
    want_region: {
        type: String,
    },
    want_vol: {
        type: String,
    },
    age: {
        type: String,
    },
    company: {
        type: String,
    },
    iscompany: {
        type: Boolean,
    },
    isopen: {
        type: Boolean,
        default: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    authcode: {
        type: String,
    },
}, { timestamps: true });
// userSchema.plugin(findOrCreate);
module.exports = mongoose_1.default.model("User", userSchema);
