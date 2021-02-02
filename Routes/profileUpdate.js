const router = require('express').Router();


const User = require('../Models/User');


//Route to update user listing
router.post('/update', async (req, res) => {
    User.collection.update(
        { "userEmail":req.body.userEmail}, 
        { 
            "$set": { 
                "userEmail": req.body.userEmail,
                "companyName": req.body.companyName,
                "basicDesc": req.body.basicDesc,
                "detailDesc": req.body.detailDesc,
                "cellNum": req.body.cellNum,
                "website": req.body.website,
                "hourlyRate": req.body.hourlyRate,
                "instaURL": req.body.instaURL,
                "twitterURL": req.body.twitterURL,
                "facebookURL": req.body.facebookURL,
                "image64": req.body.image64,
                "imageName": req.body.imageName,
                "adress": req.body.adress
            }
        } 
    );
    res.send("Listing Updated");
});

module.exports = router