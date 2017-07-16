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

// check database
Startermain.prototype.hasValidDatabase = function() {
  // check relational
  if (this.config.hasOwnProperty('database')) {
    this.database = {};
    for (var d=0;d<this.config.database.length;d++) {
      if (this.config.database[d].type == 'relational') {
        this.database['relational'] = this.config.database[d];
      } else if (this.config.database[d].type == 'unstructured') {
        this.database['unstructured'] = this.config.database[d];
      } else {}
    }
    return this.database;
  } else {
    return { error: 'Bad Request', code: 400, message: 'Database configuration error.'};
  }
};

Startermain.prototype.openRelationalDbHandle = function() {
  var sqlite3 = require('sqlite3').verbose();
  this.dbh = new sqlite3.Database('startermain.db');
};

Startermain.prototype.closeRelationalDbHandle = function() {
  this.dbh.close();
};

Startermain.prototype.createRelationalDb = function() {
  var fileLocation = this.config.templates + '/createRelationalDb.sql';
  var fs = require('fs');
  var queries = fs.readFileSync(fileLocation);
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('startermain.db');
  db.serialize(function() {
    db.run("drop table if exists user");
    db.run("drop table if exists usergroup");
    db.run("drop table if exists usergroupmembership");
    db.run("drop table if exists accesstoken");
    db.run("create table user (id PRIMARY KEY NOT NULL, name NOT NULL, username unique NOT NULL, email NOT NULL, created TIMESTAMP NOT NULL default CURRENT_TIMESTAMP, active default 'true' NOT NULL, password NOT NULL)");
    db.run("create table usergroup (id PRIMARY KEY NOT NULL, name NOT NULL, created TIMESTAMP NOT NULL default CURRENT_TIMESTAMP, active DEFAULT 'true' NOT NULL)");
    db.run("create table usergroupmembership (id PRIMARY KEY NOT NULL, userid NOT NULL, groupid NOT NULL, FOREIGN KEY(userid) REFERENCES user(id), FOREIGN KEY(groupid) REFERENCES usergroup(id))");
    db.run("create table accesstoken (token PRIMARY KEY NOT NULL, userid NOT NULL, created TIMESTAMP NOT NULL default CURRENT_TIMESTAMP, FOREIGN KEY(userid) REFERENCES user(id))");
  });
  db.close();
}

// issue a uuid version 4
Startermain.prototype.issueUuidV4 = function() {
  var uuid = require('uuid4');
  return uuid();
};

Startermain.prototype.validateUuid = function(checkThis) {
  var uuid = require('uuid4');
  return uuid.valid(checkThis);
};

// users
Startermain.prototype.userExists = function(userData, identifier) {
  var exists = false;
  var properties = ['id','name','username','email'];
  for (var p=0;p<properties.length;p++) {
    if (userData.hasOwnProperty(properties[p]) && userData[properties[p]] == identifier) {
      exists = true;
      break;
    }
  }
  return exists;
};

Startermain.prototype.prepareUserData = function(fullName, userName, email, passwordString) {
  var userData = { "username": userName, "name": fullName, "email": email };
  userData['id'] = this.issueUuidV4();
  userData['password'] = this.hashPassword(passwordString);
  return userData;
};

Startermain.prototype.validateUser = function(userData) {
  validity = true;
  var properties = ['id','name','username','email','password'];
  for (var p=0;p<properties.length;p++) {
    if (!userData.hasOwnProperty(properties[p])) {
      validity = false;
    }
  }
  if (!this.validateUuid(userData.id)) {
    validity = false;
  }
  return validity;
};

Startermain.prototype.createUser = function(userData, cb) {
  if (this.validateUser(userData)) {
    this.openRelationalDbHandle();
    this.db.serialize(function() {
      var stmt = this.dbh.prepare("insert into user (id, name, username, email, password) values (?, ?, ?, ?, ?)");
      stmt.run(userData.id, userData.name, userData.username, userData.email, userData.password);
      stmt.finalize();
    });
    this.closeRelationalDbHandle();
    cb(null, userData);
  } else {
    cb({ status: 400, message: 'user data invalid', error: 'Bad Request' });
  }
};



Startermain.prototype.getUser = function (userData, cb) {

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
    cb({ status: 400, message: 'no password passed to system', error: 'Bad Request'});
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
