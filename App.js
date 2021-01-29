const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const authRoute = require('./Routes/auth');
const adminRoute = require('./Routes/adminAuth');
const dotenv = require('dotenv');
const userRoute = require('./Routes/user');
const homeRoute = require('./Routes/home');

//DOTENV
dotenv.config();
//MIDDLEWARE.......................
app.use(express.json());
app.use(cors());
//app.use(helmet());
//app.use(compression());
//MIDDLEWARE.......................

//MONGODB ATLAS CONECTION AND SCHEMA..............
mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(()=> console.log('Connected to MongoDB Atlas...'))
.catch(err => console.error('could not connect to MongoDB Atlass',err));

//MONGODB ATLAS CONECTION..............



//CREATE SERVER..........................
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
//CREATE SERVER..........................

//use the routes
app.use('/admin', adminRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/home', homeRoute);
