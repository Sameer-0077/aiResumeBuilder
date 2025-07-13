const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is missing in environment variable");
    }
    await mongoose.connect(uri);
    console.log("MongoDB Connected!!");
  } catch (error) {
    console.log("MongoDb Connection Failed!", error.message);
    // process.exit(1);
  }
};

module.exports = connectDb;
