CREATE
DATABASE
IF
NOT
EXISTS
adsss;
USE
adsss;

DROP TABLE IF EXISTS inscriptions;
CREATE TABLE inscriptions
(
  id        smallint unsigned not null auto_increment,
  date      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reference varchar(255) not null,
  firstName varchar(255) not null,
  lastName  varchar(255) not null,
  email     varchar(255) not null,
  club      varchar(255) not null,
  street    varchar(255) not null,
  no        varchar(255) not null,
  npa       varchar(255) not null,
  locality  varchar(255) not null,
  total     smallint unsigned not null,
  dinner    smallint unsigned not null,
  vegetarian    smallint unsigned not null,
  sleeping  smallint unsigned not null,
  camping   smallint unsigned not null,
  picknick  smallint unsigned not null,
  breakfast smallint unsigned not null,
  constraint inscriptions_key primary key (id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  id       smallint unsigned not null auto_increment,
  username varchar(255) not null,
  password varchar(255) not null,
  constraint inscriptions_key primary key (id)
);

INSERT INTO users (username, password) VALUE ('foo', 'bar');
