const router = require('express').Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');


router.post('/register', async (req, res) => {
    

   

    const emailExist = await User.findOne({ userEmail: req.body.userEmail });

    if (emailExist) return res.status(400).send('Email already exists.');

    console.log(req.body.userPassword);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

    /*
    "cellNum": "0843637749",
    "website": "backendispoeskak@gmail.com",
    "hourlyRate": "750" 
    */


    const user = new User({
        userEmail: req.body.userEmail,
        userPassword: hashedPassword,
        companyname:req.body.companyname,
        basicdesc: req.body.basicdesc,
        detaildesc: req.body.detaildesc,
        cellNum: req.body.cellNum,
        website: req.body.website,
        hourlyRate: req.body.hourlyRate
    });

    try {
        const savedUser = await user.save();
        res.send({
            status: "Success",
            message: "User created successfully."
        });
    } catch (err) {
        res.status(500).send(err);
    }
})
/*
function ClassifyData(data) {
    var email = "";
    var mobile = "";

    email = data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    mobile = data.match(/(?<!\d)\d{10}(?!\d)/g);

    return {
        email : email ? true : false,
        mobile : mobile ? true : false,
    }
}
*/

router.post('/login', async (req, res) => {

    console.log(req.body);

    const { error } = LoginValidation(req.body);

    if (error) return res.status(400).send({ 'error': error.details[0].message });

    const user = await User.findOne({ email: req.body.email }, function (err, obj) { if (err) console.log(err); });

    if (!user) return res.status(400).send('Email or password is incorrect');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is incorrect');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.status(200).header('auth-token', token).send({
        status: "Success",
        message: "Logged In"
    });
    
})

router.post('/validatetoken', verify, async (req, res) => {
    res.status(200).send({
        tokenValid: true
    });
});

module.exports = router