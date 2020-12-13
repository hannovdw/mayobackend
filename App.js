const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const User = require('./Models/User');


//MIDDLEWARE.......................
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
//MIDDLEWARE.......................

//MONGODB ATLAS CONECTION AND SCHEMA..............
mongoose.connect('mongodb+srv://Hanno:Hanno@mayodb.1wizl.mongodb.net/mayodb?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(()=> console.log('Conected to MongoDB Atlas...'))
.catch(err => console.error('could not connect to MongoDB Atlass',err));

//MONGODB ATLAS CONECTION..............

//GET REQUEST...........................
app.get('/api/getdata',(req,res)=>{

    const user = new User({
        userEmail: "anus@anusmail.com",
        userPassword: "anus123",
        companyname:"Anus corp",
        basicdesc: "ons het anusse",
        detaildesc: "ons het baie anusse"
    });

    user.save();
    return res.send(user);
});
//GET REQUEST...........................

//CREATE SERVER..........................
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
//CREATE SERVER..........................

//use the routes
app.use('/admin', adminRoute);
app.use('/auth', authRoute);