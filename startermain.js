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

// users
Startermain.prototype.createUser = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.validateUser = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.userExists = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.deleteUser = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.userHasDependents = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.userLogin = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.userLogout = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.resetUserPassword = function(userData, cb) {
  if (userData.hasOwnProperty('password')) {
    userData.password = this.hashPassword(userData.password);
    cb(null, userData);
  } else {
    cb({ status: '400', message: 'no password passed to system', error: 'Bad Request'});
  }
};

Startermain.prototype.hashPassword = function(clearText) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha512');
  hash.update(clearText);
  var hashedPassword = hash.digest('hex');
  return hashedPassword;
};

Startermain.prototype.activateUser = function(userData, cb) {
  cb(null, {});
};

Startermain.prototype.deactivateUser = function(userData, cb) {
  cb(null, {});
};

// groups

module.exports = Startermain;
