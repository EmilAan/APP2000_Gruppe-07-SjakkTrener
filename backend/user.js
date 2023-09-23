const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 20

    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    }
});

module.exports = mongoose.model("User", user);
