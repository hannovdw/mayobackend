const router = require('express').Router();
const User = require('../Models/User');


router.post('/sendarray', async (req, res) => {

    {
        var data = "pous"
        res.send({
            data : data
        });

    }

   
})

module.exports = router;
