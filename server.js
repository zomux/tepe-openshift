/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env];

var app = express();
// express settings
require('./config/express')(app, config);

//index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
// Bootstrap routes
require('./config/routes')(app);

app.use(express.static(__dirname + '/public'));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1' 

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port: " + server_port)
});


// expose app
exports = module.exports = app;


