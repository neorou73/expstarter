const express = require('express');
const app = express();
const startermain = require('./startermain');

app.get('/', function (req, res) {
  var sm = new startermain();
  res.send('Hello World! Running on port ' + sm.config.port);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
