"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crewcommentSchema = require("./Crewcomment");
const crewboardSchema = new Schema({
    like: [{ type: Schema.Types.ObjectId, ref: "User" }],
    like_count: {
        type: Number,
        default: 0,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    shorts_description: String,
    title: String,
    description: String,
    images: Array,
    crewcomments: [
        {
            type: crewcommentSchema,
            ref: "Crewcomment",
        },
    ],
    isopen: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
// boardSchema.plugin(findOrCreate);
module.exports = mongoose.model("Crewboard", crewboardSchema);
