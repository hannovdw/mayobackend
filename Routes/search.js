const router = require('express').Router();
const User = require('../Models/User');

router.get('/search', async (req, res) => {
    User.find(
        {$or:[
            {"service":{"$in":req.body.service}},
            {"city":{"$in":req.body.city}},
            {"suburb":{"$in":req.body.suburb}},
            {"adress":{"$in":req.body.search}}
        ]}
    ).then((data) => {
        return res.status(200).json(data.slice(req.query.start, (parseInt(req.query.start) + 5)));
    })

})

module.exports = router;

