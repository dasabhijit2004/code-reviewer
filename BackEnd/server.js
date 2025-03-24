require('dotenv').config()
const cors = require("cors");
const express = require("express");
const app = require('./src/app')

app.use(cors()); // Enable CORS
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

