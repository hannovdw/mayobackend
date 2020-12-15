const router = require('express').Router();
const { string } = require('joi');
const User = require('../Models/User');
var email = "";

router.post('/getlisting', async (req, res) => {


    const emailExist = await User.findOne({ userEmail: req.body.userEmail });

    if (!emailExist) return res.status(400).send('Account not found');

    else{
        const user = await User.findOne({ userEmail: req.body.userEmail }, function (err, obj) { if (err) console.log(err); });
        res.send({
            status: "Success",
            message: "User found",
            data : user
        });

    }


})

module.exports = router;