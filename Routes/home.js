const router = require('express').Router();
const User = require('../Models/User');

router.get('/getlistings', async (req, res) => {
    User.find().then((data) => {
        return res.status(200).json(data.slice(req.query.start, (parseInt(req.query.start) + 5)));
    })

})

module.exports = router;