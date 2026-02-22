const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
    if (!DB_URL) {
        throw new Error('DB_URL is missing in environment variables');
    }

    await mongoose.connect(DB_URL);
    console.log('MongoDB is Connected...');
};

module.exports = connectDB;
