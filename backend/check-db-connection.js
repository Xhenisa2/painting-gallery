require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log("MongoDB application connection successful");
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("MongoDB application connection failed:", error.message);
    process.exitCode = 1;
  });
