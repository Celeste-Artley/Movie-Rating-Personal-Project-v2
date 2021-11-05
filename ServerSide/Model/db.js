const mongoose = require("mongoose");
const URL =
  "mongodb+srv://celestial_giraffe:Evaluate531246@porfolio.f8l79.mongodb.net/moviereviews?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
