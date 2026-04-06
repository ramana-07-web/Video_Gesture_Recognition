require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./db/conn");

const router = require("./routes/router"); // lowercase

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api", router);

// DB connect + server start
const PORT = process.env.PORT || 4002;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("DB connection failed:", err);
});