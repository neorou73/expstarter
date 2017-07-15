var Startermain = function() {
  // should probably check for config, if not create one
  this.configPath = './starter.config.json';
  var fs = require('fs');
  var fsls = fs.lstatSync('./starter.config.json');
  if (fsls.isFile()) {
    this.config = require(this.configPath);
  } else {
    // copy the default file
    this.config = require('./starter.config.default.json');
  }
};

module.exports = Startermain;
