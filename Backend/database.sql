
create database Player;

use Player;

create table Devices(
	id_device int not null auto_increment PRIMARY KEY,
	name varchar(50) not null,
	code varchar(50) not null,
	id_playlist int null,
	description varchar(100)
);

create table Playlists(
	id_playlist int not null auto_increment PRIMARY KEY,
	title varchar(100) not null,
	hash_list varchar(64) not null
);

ALTER TABLE Devices ADD FOREIGN KEY (id_playlist) REFERENCES Playlists(id_playlist); 

create table Files(
	id_file int not null auto_increment PRIMARY KEY,
	filename varchar(100) not null, 
	type varchar(25) not null,
	hash_file varchar(64) not null,
	path varchar(100) not null
);

create table Assign(
	id_assign int not null auto_increment PRIMARY KEY,
	id_playlist int not null,
	id_file int not null,
	duration int,
	FOREIGN KEY (id_playlist) REFERENCES Playlists(id_playlist),
	FOREIGN KEY (id_file) REFERENCES Files(id_file)	
);

create table Codes(
	id_code int not null auto_increment PRIMARY KEY,
	code varchar(6) not null
);

--==============================================================================================================================
--==============================================================================================================================
--*********************************SOME SAMPLE INSERTIONS***********************************************************************
--==============================================================================================================================
--==============================================================================================================================


INSERT INTO `Codes` (code) VALUES ('AAA111');
INSERT INTO `Codes` (code) VALUES ('AAA222');
INSERT INTO `Codes` (code) VALUES ('AAA333');
