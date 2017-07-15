const express = require('express');
const app = express();
const startermain = require('./startermain');
var sm = new startermain();

app.get('/', function (req, res) {
  res.send('Success! Express Starter is Running on port ' + sm.config.port);
});

app.get('/hash-test/:clearText', function(req, res) {
  if (req.params.hasOwnProperty('clearText')) {
    var hashedPassword = sm.hashPassword(req.params.clearText);
    var output = req.params.clearText + ' outputs: ' + hashedPassword;
  } else {
    var output = 'nothing passed: '
  }
  res.send(output);
});

app.listen(3000, function () {
  console.log('Example app listening on ' + sm.config.host + ', port ' + sm.config.port + '!');
});
