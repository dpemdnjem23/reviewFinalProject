"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//대댓글의 대댓글 만들려고해 childschema가 
const freechildcommentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: "Freechildcomment",
    },
    child_comment: {
        type: String,
        maxLength: 300,
    },
    isDeleted: Boolean,
}, { timestamps: true });
// freecommentSchema.plugin(findOrCreate);
module.exports = freechildcommentSchema;
// module.exports = mongoose.model("Freechildcomment", freechildcommentSchema);
// mongoose.model("Freecomment", freecommentSchema);
