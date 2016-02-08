var express = require('express');
var app = express();
var PORT = 8080;

// MIDDLEWARE - public
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));
