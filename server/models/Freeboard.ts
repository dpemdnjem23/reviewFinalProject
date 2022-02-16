export {}

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var freecommentSchema = require("./Freecomment");
var freeboardSchema = new Schema({
like:[{type: Schema.Types.ObjectId,ref:'User'}],

user_id:{
    type:Schema.Types.ObjectId,
    ref:'User',
},
title:String,
description:String,
images:Array,
isopen: {
    type: Boolean,
    default: true,
  },




},{timestamps:true})

module.exports = mongoose.model("Freeboard", freeboardSchema);