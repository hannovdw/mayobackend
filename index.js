const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');


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

const metaSchema = new mongoose.Schema({
    useremail: String,
    userpassword: String,
    companyname: String,
    basicdesc: String,
    detaildesc: String
});
const MetaData = mongoose.model('MetaData', metaSchema);
//MONGODB ATLAS CONECTION..............




//GET REQUEST...........................
app.get('/api/getdata',(req,res)=>{

    const meta = new MetaData({
        useremail: 'waynekok@gmail.com',
        userpassword: 'waynekok123',
        companyname: 'Waynes Plumbing',
        basicdesc: 'Your local free ice and coke despensary',
        detaildesc: 'more more zanadiiiiiiiii'
    });

    meta.save();
    return res.send(meta);
});
//GET REQUEST...........................

//STORE DATA POST ...........................
app.post('/api/storedata',function(req, res){
    console.log(req.body);
    const meta = new MetaData({
        empid: req.body.empid,
        doctype: req.body.filetype,
        id: req.body.id,
        email: req.body.email,
        telnr: req.body.phone,
        carreg: req.body.carreg
    });
    meta.save();
    return res.send('Record stored successfully');
    
});
//STORE DATA POST ...........................


//POST FILE REQUEST.........................
app.post('/api/postfile',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500);
           } else if (err) {
               return res.status(500);
           }
    })
    
    setTimeout(myFunction, 1000);

    function myFunction(){
        let type = fileType();
        if(type == 'txt'){
            txtParser();
            console.log(contarr[0]);
            classify();
        }
        if(type == 'xlsx'){
            excellParser();
            classifyExcel();
        }
        if(type == 'csv'){
            csvParser();
            classifyExcel();
        }
        deleteFile();
    }
    return res.send(classjson);
    
});
//POST REQUEST.........................


//CREATE SERVER..........................
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
//CREATE SERVER..........................