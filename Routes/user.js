const router = require('express').Router();
const tokenVerification = require('./verifyToken');
const User = require('../Models/User');

router.get('/getdata', tokenVerification, async (req, res) => {

    console.log(req.user);
    const userId = req.user._id;
    console.log(userId);

    var companyName = "fok oll";
    var userEmail = "niks";
    var cellNum =  "kont oll";
    var website = "warie";

    User.findOne({ _id: userId }).then(user => {
      if (user) {
        
        companyName = user.companyName
        userEmail = user.userEmail
        cellNum = user.cellNum
        website = user.website
      } else {
        return res.status(400).json({ userId: "User not found" });  
        }
    });
    //Logic
    //Database callings to get valid data for userId

    //Update this object
    //||
    //var totalclicks = db.clicks
    
    var response = {
        totalClicks: 123,
        monthlyClicks: 20,
        name: companyName,
        location: "Centurion",
        contactInformation: {
          work: "Plumbing",
          website: website,
          mail: userEmail,
          phone: cellNum
        }
      }

    res.send(response);
})

module.exports = router;
