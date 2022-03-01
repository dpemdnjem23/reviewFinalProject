require("dotenv").config
export{}
const mongoose = require("mongoose");

  module.exports = () => {
    const uri :string  = `${process.env.MONGODB_URI}`;
    // * mongoDB connect *
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
      })
      .then(() => console.log(`mongoDB connected`))
      .catch((err: Error)  => console.error(`failed connection cause ${err}`));
  };