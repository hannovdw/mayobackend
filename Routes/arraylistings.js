const router = require('express').Router();
const User = require('../Models/User');


router.post('/sendarray', async (req, res) => {

    {
        var data = User.find().toArray();
        res.send({
            data : data
        });

    }

   
})

module.exports = router;
