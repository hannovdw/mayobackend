const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const authRoute = require('./Routes/auth');
const adminRoute = require('./Routes/Admin');
const User = require('./Models/User');


//MIDDLEWARE.......................
app.use(express.json());
app.use(cors());
//app.use(helmet());
//app.use(compression());
//MIDDLEWARE.......................

//MONGODB ATLAS CONECTION AND SCHEMA..............
mongoose.connect('mongodb+srv://Hanno:Hanno@mayodb.1wizl.mongodb.net/mayodb?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(()=> console.log('Conected to MongoDB Atlas...'))
.catch(err => console.error('could not connect to MongoDB Atlass',err));

//MONGODB ATLAS CONECTION..............

//GET REQUEST...........................
app.get('/api/getdata',(req,res)=>{

    const user = new User({
        userEmail: "ivananus@anusmail.com",
        userPassword: "anus1235",
        companyname:"Anus dewald corp",
        basicdesc: "ons het dewald anusse",
        detaildesc: "ons het baie dewald anusse"
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
app.use('/Admin', adminRoute);
app.use('/auth', authRoute);