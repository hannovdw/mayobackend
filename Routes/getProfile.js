const router = require('express').Router();
const tokenVerification = require('./verifyToken');
const User = require('../Models/User');

router.get('/getUser', async (req, res) => {

  const userMail = req.query.userEmail;

  var companyName = "";
  var userEmail = "";
  var cellNum = "";
  var website = "";
  var basicDesc = "";
  var detailedDesc = "";
  var instagram = "";
  var twitter = "";
  var facebook = "";
  var active = "";
  var image = "";
  var adress = "";
  var service= "";
  var suburb = "";
  var city = "";


  User.findOne({ userEmail: userMail }).then(user => {
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
      suburb = user.suburb
      city = user.city

      var response = {
        totalClicks: 123,
        monthlyClicks: 20,
        name: companyName,
        location: adress,
        suburb: suburb,
        city: city,
        hourlyRate: hourlyRate,
        basicDesc: basicDesc,
        detailDesc: detailedDesc,
        active: active,
        profileImage: image,
        service:service,
        contactInformation: {
          work: service,
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
      return res.status(400).json({ userEmail: "User not found" });
    }
  });
})

module.exports = router;
