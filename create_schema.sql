drop table if exists users;

create table  user (id varchar(32),name varchar(32),age int,created_at datetime, updated_at datetime,email varchar(32));

drop table if exists token;

create table  token (intAuthToken varchar(32),id varchar(32) ,device varchar(32),ip varchar(16),created_at datetime, updated_at datetime,email varchar(32)) ;


