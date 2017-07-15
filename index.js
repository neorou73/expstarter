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
    res.send(output);
  } else {
    res.status(400).json({ error: 'invalid request' });
  }
});

app.get('/issue-uuid', function(req, res) {
  res.send(sm.issueUuidV4());
});

app.get('/example/:exampleType', function(req, res) {
  if (req.params.hasOwnProperty('exampleType')) {
    var exampleType = req.params.exampleType;
  }
  if (exampleType && exampleType == 'user' || exampleType && exampleType == 'group' ) {
    var userTemplate = require('./lib/templates/' + exampleType + '.json');
    res.type('json');
    res.send(userTemplate);
  } else if (exampleType && exampleType == 'database') {
    var dbj = sm.hasValidDatabase();
    res.type('json');
    res.send(dbj);
  } else {
    res.status(400).json({ error: 'invalid request' });
  }

});

if (sm.config.hasOwnProperty('port')) {
  app.listen(sm.config.port, function () {
    console.log('Example app listening on ' + sm.config.host + ', port ' + sm.config.port + '!');
  });
} else {
  console.log('Startermain object has errors. Can not start application.');
}
