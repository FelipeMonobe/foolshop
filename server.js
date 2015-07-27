var dbURL = process.env.DATABASE_URL;

require('./config/database')('mongodb://' + dbURL + '/foolshop');

var express = require('express'),
  app = require('./config/express')(app),
  port = process.env.PORT || 5000;

app.listen(port);

module.exports = app;

console.log();
console.log('Server listening at http://localhost:' + port);
