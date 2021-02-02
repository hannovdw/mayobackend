const mongoose = require('mongoose');
// const userSchema = require('./User')

const clickSchema = new mongoose.Schema({

    //user: userSchema
    userEmail: {
        type: String,
        required: true,
        max: 255,
        min: 5
    },
    clickDateTime: String,

});
module.exports = mongoose.model('clickData', clickSchema);