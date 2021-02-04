const router = require('express').Router();
const User = require('../Models/User');

router.get('/search', async (req, res) => {
    User.find(
        {$or:[
            {"service":{"$in":req.query.service}},
            {"city":{"$in":req.query.city}},
            {"suburb":{"$in":req.query.suburb}},
            {"adress":{"$in":req.query.adress}}
        ]}
    ).then((data) => {
        return res.status(200).json(data);
    })

})

module.exports = router;

