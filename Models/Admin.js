const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminEmail: {
        type: String,
        required: false,
        max: 255,
        min: 5
    },
    adminPassword: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    cellNum: String,
    address: String
});

module.exports = mongoose.model('Admin', adminSchema);