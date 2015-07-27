require('./config/database')('mongodb://localhost/foolshop');

var express = require('express'),
  app = require('./config/express')(app),
  port = process.env.PORT || 5000;

app.listen(port);

module.exports = app;

console.log();
console.log('Server listening at http://localhost:' + port);
