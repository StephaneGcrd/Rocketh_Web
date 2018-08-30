//server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var router = require('./routes/routes.js')
let app = express();

const port = process.env.PORT || 8000;

var mongoose = require('mongoose');
var mongoDB = 'mongodb://WebUser:ethereum@ds255309.mlab.com:55309/rockethdb';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../../../build')));
app.use('/', router);


app.listen(port, _=> console.log(`The server is listening on port ${port}`));
