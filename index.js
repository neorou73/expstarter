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
    var output = 'invalid request';
  }
  res.send(output);
});

app.get('/example/:exampleType', function(req, res) {
  if (req.params.hasOwnProperty('exampleType')) {
    var exampleType = req.params.exampleType;
  }
  if (exampleType && exampleType == 'user' || exampleType && exampleType == 'group') {
    var userTemplate = require('./lib/templates/' + exampleType + '.json');
    res.type('json');
    res.send(userTemplate);
  } else {
    res.send('invalid request');
  }

});

app.listen(3000, function () {
  console.log('Example app listening on ' + sm.config.host + ', port ' + sm.config.port + '!');
});
