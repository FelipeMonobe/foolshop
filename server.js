require('./config/database')('mongodb://localhost/foolshop');

var express = require('express'),
  app = require('./config/express')(app),
  port = 1337;

app.listen(port);

module.exports = app;

console.log('Server listening at http://localhost:' + port);
