"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const freecommentSchema = require("./Freecomment");
const freeboardSchema = new Schema({
    like: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    description: String,
    images: Array,
    isopen: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
module.exports = mongoose.model("Freeboard", freeboardSchema);
