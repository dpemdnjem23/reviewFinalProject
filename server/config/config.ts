require("dotenv").config

const mongoose = require("mongoose");
const { isExpressionStatement } = require("typescript");
  
  module.exports = () => {
    const uri = `${process.env.MONGODB_URI}`;
    // * mongoDB connect *
    mongoose
      .connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
      })
      .then(() => console.log(`mongoDB connected`))
      .catch((err: Error)  => console.error(`failed connection cause ${err}`));
  };