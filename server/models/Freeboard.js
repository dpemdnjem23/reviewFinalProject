const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const freecommentSchema = require("./Freecomment");
const freeboardSchema = new Schema({
like:[{type: Schema.Types.ObjectId,ref:'User'}],

user_id:{
    type:Schema.Types.ObjectId,
    ref:'User',
},
title:String,
description:String.toString,
images:Array,





},{timestamps:true})

module.exports = mongoose.model("Freeboard", freeboardSchema);