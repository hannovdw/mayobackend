const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({

    userEmail: {
        type: String,
        required: true,
        max: 255,
        min: 5
    },
    clickIP: String,
    clickDate: String,
    clickTime: String,
    clickRegion: String



});
module.exports = mongoose.model('clickData', clickSchema);