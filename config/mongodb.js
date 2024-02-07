const {connect} = require("mongoose");
const dbConnect = async() => {
    try {
      await connect(process.env.MONGODB_URL);
      console.log("Db connected");
    } catch (error) {   
       console.log('db error',process.env.MONGODB_URL);
    }
  };

  module.exports = dbConnect;