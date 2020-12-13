const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  /*
    userSignUp:{
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

    },
    userInfo:{
        companyname: String,
        basicdesc: String,
        detaildesc: String,
        cellNum: String,
        website: String,
        hourlyRate: String
    }
    */
    
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
    detaildesc: String,
    cellNum: String,
    website: String,
    hourlyRate: String
    

});

module.exports = mongoose.model('User', userSchema);