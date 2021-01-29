const router = require('express').Router();
const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyAdmin');

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

    Admin.findOne({ adminEmail: req.body.adminEmail }).then(admin => {
        if (admin) {
            return res.status(400).json({ adminEmail: "Email already exists" });
          } else {
            const newAdmin = new Admin({
                adminEmail: req.body.adminEmail,
                adminPassword: req.body.adminPassword,
                cellNum: req.body.cellNum,
                address: req.body.address
            });
        // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.adminPassword, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.adminPassword = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => console.log(err));
        });
        });
        }  //End of if else statement above const new admin
    });
})


//Login Route
router.post('/login',async (req,res) => {

    console.log(req.body);

    const { error } = validateLoginInput(req.body);

    if (error) return res.status(400).send({ 'error': error.details[0].message });

    const admin = await Admin.findOne({ adminEmail: req.body.adminEmail }, function (err, obj) { if (err) console.log(err); });
    console.log(admin);
    if (!admin) return res.status(400).send('Email or password is incorrect');

    const validPass = await bcrypt.compareSync(req.body.adminPassword, admin.adminPassword);
    if (!validPass) return res.status(400).send('Email or password is incorrect');
    console.log(req.body);

    const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
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