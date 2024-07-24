const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://shubhangijadhavv1:KMEkYmIyz580MvG5@reactnative.v9ysihh.mongodb.net/');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
// KMEkYmIyz580MvG5
// shubhangijadhavv1