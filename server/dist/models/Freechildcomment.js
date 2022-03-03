"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const freechildcommentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    freeboard_id: {
        type: Schema.Types.ObjectId,
        ref: "Freeboard",
        required: true,
    },
    freecomment_id: {
        type: Schema.Types.ObjectId,
        ref: "Freecomment",
    },
    child_comment: {
        type: String,
        maxLength: 300,
    },
    depth: {
        type: Number
    },
    parent: {
        type: Boolean
    }
}, { timestamps: true });
// freecommentSchema.plugin(findOrCreate);
module.exports = freechildcommentSchema;
// module.exports = mongoose.model("Freechildcomment", freechildcommentSchema);
// mongoose.model("Freecomment", freecommentSchema);
