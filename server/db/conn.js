const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        console.error("DB Error:", error.message);
        process.exit(1); // kill app if DB fails
    }
};
console.log("RAW URI:", process.env.MONGO_URI);

module.exports = connectDB;