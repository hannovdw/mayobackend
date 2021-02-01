const router = require('express').Router();
const tokenVerification = require('./verifyToken');
const User = require('../Models/User');

router.get('/getdata', tokenVerification, async (req, res) => {

  const userId = req.user._id;

  var companyName = "fok oll";
  var userEmail = "niks";
  var cellNum = "kont oll";
  var website = "warie";
  var basicDesc = "mmmm";
  var detailedDesc = "mmmm";
  var instagram = "mmm";
  var twitter = "mmm";
  var facebook = "mmm";
  var active = "";
  var image = "";
  var adress = "";
  var service= "";


  User.findOne({ _id: userId }).then(user => {
    if (user) {
      companyName = user.companyName
      userEmail = user.userEmail
      cellNum = user.cellNum
      website = user.website
      hourlyRate = user.hourlyRate
      basicDesc = user.basicDesc
      detailedDesc = user.detailDesc
      instagram = user.instaURL
      twitter = user.twitterURL
      facebook = user.facebookURL
      active = user.active
      image = user.image64
      adress = user.adress
      service = user.service

      var response = {
        totalClicks: 123,
        monthlyClicks: 20,
        name: companyName,
        location: adress,
        hourlyRate: hourlyRate,
        basicDesc: basicDesc,
        detailDesc: detailedDesc,
        active: active,
        profileImage: image,
        service:service,
        contactInformation: {
          work: "Plumbing",
          website: website,
          mail: userEmail,
          phone: cellNum,
          instaURL: instagram,
          twitterURL: twitter,
          facebookURL: facebook
        }
      }

      res.send(response);

    } else {
      return res.status(400).json({ userId: "User not found" });
    }
  });
})

module.exports = router;
