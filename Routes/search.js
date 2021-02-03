const router = require('express').Router();
const User = require('../Models/User');

router.get('/getlistings', async (req, res) => {
    User.find(
        {$or:[
            {"service":{"$in":res.body.service}},
            {"city":{"$in":res.body.city}},
            {"suburb":{"$in":res.body.suburb}},
            {"adress":{"$in":res.body.adress}}
        ]}
    ).then((data) => {
        return res.status(200).json(data.slice(req.query.start, (parseInt(req.query.start) + 5)));
    })

})

module.exports = router;

