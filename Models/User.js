const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: false,
        max: 255,
        min: 5
    },
    userPassword: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    companyname: String,
    basicdesc: String,
    detaildesc: String
});

module.exports = mongoose.model('User', userSchema);