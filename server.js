var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
let cfenv = require('cfenv'); // cloud foundry environment

var multer = require('multer');
//var multerupload = multer({dest: 'images/'});


var app = express();
var api = require('./routes/api.js');

app.use(logger('dev'));

app.use(bodyParser.json()); //parses json and sets to body
app.use(bodyParser.urlencoded({ extended: false }));

let 

var mongoose = require('mongoose');
var mongoURI = "mongodb://sa:Password123456789@ds255451.mlab.com:55451/bluebeluga";
var mongodb = mongoose.connect(mongoURI).connection;
mongodb.on('error', function(err){console.log(err.message);});
mongodb.once('open', function(){
    console.log("Connection established");
});

/*app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/


// app.use(multer({ dest: './images/', 
//     rename: function(fieldname, filename){
//         return filename;
//     },
// }));

var ObjectID = mongodb.ObjectID;

app.use('/api', api);
// app.get('/test', function(req, res, next) {
//     res.json({"name": "test"});
// });
// app.post('/test', function(req, res, next) {
//     console.dir(req.body.name);
//     if (req.body.name.length < 2) {
//         return res.status(400).send("Need name of length greater than 2");
//     }
//     return res.status(200).send("yay");
// });

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("App is running on " + port);
});