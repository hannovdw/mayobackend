const router = require('express').Router();
const User = require('../Models/User');

router.get('/getlistings', async (req, res) => {

    var filters = [];

    var applyFilters = null;

    if (req.query.service != '' && req.query.service != null) {
        filters.push({ "service": { "$in": req.query.service } });
    }

    if (req.query.location != '' && req.query.location != null) {
        filters.push({ "city": { "$in": req.query.location } });
        filters.push({ "suburb": { "$in": req.query.location } });
        filters.push({ "adress": { "$in": req.query.location } });
    }

    if (filters.length > 0) {
        User.find({
            $or: filters
        }).then((data) => {
            return res.status(200).json(data.slice(req.query.start, (parseInt(req.query.start) + 5)));
        })
    }
    else {
        User.find().then((data) => {
            return res.status(200).json(data.slice(req.query.start, (parseInt(req.query.start) + 5)));
        })
    }


})

module.exports = router;