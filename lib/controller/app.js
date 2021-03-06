// BASE SETUP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
// =============================================================================
var control = require('./routes/control.js');
var status = require('./routes/status.js');
app.use('/api', control);
app.use('/api', status);

// START SERVER
// =============================================================================
app.listen(port);
console.log('listen on : ' + port);
