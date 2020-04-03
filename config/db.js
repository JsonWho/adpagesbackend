const mongoose = require('mongoose');
const config = require('config');
const mongoDB = 'mongodb://127.0.0.1:27017/adultpages'
// const mongoDB = 'mongodb://adpages:Sputnik@127.0.0.1:27017/adultpages'


const connectDB = async () => {
  try {
    await mongoose.connect(
      mongoDB,
      { useNewUrlParser: true }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
