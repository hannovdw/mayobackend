const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Admin', adminSchema);