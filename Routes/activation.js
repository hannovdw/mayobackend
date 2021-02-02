const router = require('express').Router();


const User = require('../Models/User');


//Route to deactivate account
router.post('/deactivate', async (req, res) => {
    User.collection.update(
        { "userEmail":req.body.userEmail}, 
        { 
            "$set": { 
                "active" : false
            }
        } 
    );
    res.send("Listing Deactivated");
});

//Route to activate account
router.post('/activate', async (req, res) => {
    User.collection.update(
        { "userEmail":req.body.userEmail}, 
        { 
            "$set": { 
                "active" : true
            }
        } 
    );
    res.send("Listing Activated");
});

module.exports = router