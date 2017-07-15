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
var createUser = function(userData, cb) {
  cb(null, {});
};

var validateUser = function(userData, cb) {
  cb(null, {});
};

var userExists = function(userData, cb) {
  cb(null, {});
};

var deleteUser = function(userData, cb) {
  cb(null, {});
};

var userHasDependents = function(userData, cb) {
  cb(null, {});
};

var userLogin = function(userData, cb) {
  cb(null, {});
};

var userLogout = function(userData, cb) {
  cb(null, {});
};

var resetUserPassword = function(userData, cb) {
  if (userData.hasOwnProperty('password')) {
    userData.password = hashPassword(userData.password);
    cb(null, userData);
  } else {
    cb({ status: '400', message: 'no password passed to system', error: 'Bad Request'});
  }
};

var hashPassword = function(clearText) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha512');
  hash.update(clearText);
  var hashedPassword = hash.digest('hex');
  return hashedPassword;
};

var activateUser = function(userData, cb) {
  cb(null, {});
};

var deactivateUser = function(userData, cb) {
  cb(null, {});
};

// groups

module.exports = Startermain;
