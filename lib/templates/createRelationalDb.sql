drop table if exists user;

create table user (
  id PRIMARY KEY NOT NULL,
  name NOT NULL,
  username unique NOT NULL,
  email NOT NULL,
  created TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
  active default 'true' NOT NULL,
  password NOT NULL
);

/* s3cr3t! outputs: 670fd70cf9c5eb009281fbca10051b0708c3faa14350a9df6c6cc4a07fec07546db3dcf5b20310a482212b6f7047786d7a8a9c2655d8507d29d400428ed3ab48 */
insert into user (
  id,
  name,
  username,
  email,
  password) values (
  '20af9863-9471-43d1-9418-528a29c3b545',
  'Administrator',
  'admin',
  'neorou@gmail.com',
  '670fd70cf9c5eb009281fbca10051b0708c3faa14350a9df6c6cc4a07fec07546db3dcf5b20310a482212b6f7047786d7a8a9c2655d8507d29d400428ed3ab48'
);

drop table if exists usergroup;

create table usergroup (
  id PRIMARY KEY NOT NULL,
  name NOT NULL,
  created TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
  active DEFAULT 'true' NOT NULL
);

insert into usergroup (
  id,
  name
) values (
  'b83f19c9-a4ee-461d-afc7-734f700dba17',
  'admin'
);

drop table if exists usergroupmembership;

create table usergroupmembership (
  id PRIMARY KEY NOT NULL,
  userid NOT NULL,
  groupid NOT NULL,
  FOREIGN KEY(userid) REFERENCES user(id),
  FOREIGN KEY(groupid) REFERENCES usergroup(id)
);

insert into usergroupmembership (
  id,
  userid,
  groupid
) values (
  '4eea028b-65f1-4d68-87ae-db81aa3642ed',
  '20af9863-9471-43d1-9418-528a29c3b545',
  'b83f19c9-a4ee-461d-afc7-734f700dba17'
);
