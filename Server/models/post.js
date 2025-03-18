const mongoose = require("mongoose");

const post = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    }
})