const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Adjust this path if your file is located somewhere else
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const PORT = process.env.PORT || 5000;

// Env variables
require("dotenv").config();
// Database connection
connectDB();
const app = express();
app.use('/api/auth', authRoutes);
// app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

