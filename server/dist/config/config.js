"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config;
const mongoose = require("mongoose");
module.exports = () => {
    const uri = `${process.env.MONGODB_URI}`;
    // * mongoDB connect *
    mongoose
        .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log(`mongoDB connected`))
        .catch((err) => console.error(`failed connection cause ${err}`));
};
