const mongoose = require("mongoose");

const connectDB = async () => {
  const dbUri =
    process.env.NODE_ENV === "test"
      ? "mongodb://127.0.0.1:27017/testdb"
      : "mongodb://127.0.0.1:27017/itemsdb";

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully to ${dbUri}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // Let the caller handle the error
  }
};

module.exports = { connectDB };
