const router = require('express').Router();
const tokenVerification = require('./verifyToken');

router.get('/getdata', tokenVerification, async (req, res) => {

    console.log(req.user);
    //const userId = req.user._Id;

    //Logic
    //Database callings to get valid data for userId

    //Update this object
    //||
    //var totalclicks = db.clicks
    
    var response = {
        totalClicks: 123,
        monthlyClicks: 20,
        name: "John Doe",
        location: "Centurion",
        contactInformation: {
          work: "Plumbing",
          website: "https://pornhub.com",
          mail: "johnnysins@pornhub.com",
          phone: "071 6969 420"
        }
      }

    res.send(response);
})

module.exports = router;
