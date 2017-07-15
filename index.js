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

app.get('/create-database', function(req, res) {
  sm.createRelationalDb();
  res.send('done');
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

// create a new user account
/*
to test this, you can issue the following in a POSIX compliant terminal with curl installed
curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
curl -H "Content-Type: application/json" -X POST -d 'sampleData' http://localhost:3000/create-new-user

sampleData:
{ "userData": {
    "id"" "1e2c15f9-2d96-47b1-8f59-d2c36d5079b4",
    "email": "someaddress@somedomain.com",
    "username": "theTank",
    "name": "Frank Ricard",
    "password":"cumon!"
  }
}



SO....

curl -H "Content-Type: application/json" -X POST -d '{  "userData": {"id": "1e2c15f9-2d96-47b1-8f59-d2c36d5079b4", "email": "someaddress@somedomain.com", "username": "theTank",  "name": "Frank Ricard",  "password":"cumon!"} }' http://localhost:8000/create-new-user
*/

app.post('/create-new-user', function (req, res) {
  if (!req.params.hasOwnProperty(userData)) {
    res.status(400).json({ error: 'improper user data request - please specify user data' });
  } else {
    console.log(req.params);
    res.send('user data recorded. thank you...');
  }
});

// specify the app
if (sm.config.hasOwnProperty('port')) {
  app.listen(sm.config.port, function () {
    console.log('Example app listening on ' + sm.config.host + ', port ' + sm.config.port + '!');
  });
} else {
  console.log('Startermain object has errors. Can not start application.');
}
