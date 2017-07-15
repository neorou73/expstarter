const express = require('express');
const app = express();
const startermain = require('./startermain');
var sm = new startermain();

app.get('/', function (req, res) {
  res.send('Success! Express Starter is Running on port ' + sm.config.port);
});

app.listen(3000, function () {
  console.log('Example app listening on ' + sm.config.host + ', port ' + sm.config.port + '!');
});
