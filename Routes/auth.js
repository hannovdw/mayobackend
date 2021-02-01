const router = require('express').Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

//Validation
const validateRegisterInput = require('../register');
const validateLoginInput = require('../login');

//Register Route
router.post('/register', async (req, res) => {

    console.log(req.body);
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
    return res.status(400).json(errors);
    }

    User.findOne({ userEmail: req.body.userEmail }).then(user => {
        if (user) {
            return res.status(400).json({ userEmail: "Email already exists" });
          } else {
            const newUser = new User({
                userEmail: req.body.userEmail,
                userPassword: req.body.userPassword,
                companyName: req.body.companyname,
                basicDesc: req.body.basicdesc,
                detailDesc: req.body.detaildesc,
                cellNum: req.body.cellNum,
                website: req.body.website,
                hourlyRate: req.body.hourlyRate,
                instaURL: req.body.instagram,
                twitterURL: req.body.twitter,
                facebookURL: req.body.facebook,
                image64: req.body.image64,
                imageName: req.body.imageName,
                active: req.body.active,
                adress: req.body.adress,
                service: req.body.service
            });

            
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.userPassword, salt, (err, hash) => {
                if (err) throw err;
                newUser.userPassword = hash;
                newUser
                    .save()
                    .then(user => {
                        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                        res.header('Access-Control-Expose-Headers', 'auth-token')
                        res.status(200).header('auth-token', token).send({
                            status: "Success",
                            message: "Logged In"
                        });
                    })
                    .catch(err => console.log(err));
            });
        });
    }  //End of if else statement above const new user
    });
    
})


//Login Route
router.post('/login',async (req,res) => {

    console.log(req.body);

    const { error } = validateLoginInput(req.body);

    if (error) return res.status(400).send({ 'error': error.details[0].message });

    const user = await User.findOne({ userEmail: req.body.userEmail }, function (err, obj) { if (err) console.log(err); });
    console.log(user);
    if (!user) return res.status(400).send('Email or password is incorrect');

    const validPass = await bcrypt.compareSync(req.body.userPassword, user.userPassword);
    if (!validPass) return res.status(400).send('Email or password is incorrect');
    console.log(req.body);

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('Access-Control-Expose-Headers', 'auth-token')
    res.status(200).header('auth-token', token).send({
        status: "Success",
        message: "Logged In"
    });  
  
});


router.post('/validatetoken', verify, async (req, res) => {
    res.status(200).send({
        tokenValid: true
    });
});

module.exports = router