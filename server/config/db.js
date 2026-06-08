const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Just pass the URI, no extra options needed!
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('mongodb connection error', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;