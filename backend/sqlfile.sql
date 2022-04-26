CREATE DATABASE childcheckin;

show databases;

use childcheckin;

show tables;

CREATE TABLE center(
    center_id INT AUTO_INCREMENT,
    address VARCHAR(255),
    zip_code VARCHAR(5),
    name VARCHAR(255),
    PRIMARY KEY (center_id)
);
DROP TABLE center;


CREATE TABLE parent(
    parent_id INT AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(50),
    username VARCHAR(255),
    password VARCHAR(255),
    center_id INT,
    PRIMARY KEY (parent_id),
    FOREIGN KEY (center_id) references center(center_id)
);
DROP TABLE parent;


CREATE TABLE room(
    room_id INT AUTO_INCREMENT,
    room_name VARCHAR(255),
    center_id INT,
    PRIMARY KEY (room_id, center_id),
    FOREIGN KEY (center_id) references center(center_id)
);
DROP TABLE room;


CREATE TABLE employee(
    employee_id INT AUTO_INCREMENT,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    center_id INT,
    room_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (center_id) references center(center_id),
    FOREIGN KEY (room_id) references room(room_id)
);
DROP TABLE employee;


CREATE TABLE child(
    child_id INT AUTO_INCREMENT,
    age VARCHAR(2),
    name VARCHAR(255),
    health VARCHAR(255),
    center_id INT,
    parent_id INT,
    room_id INT,
    PRIMARY KEY (child_id),
    FOREIGN KEY (center_id) references center(center_id),
    FOREIGN KEY (parent_id) references parent(parent_id),
    FOREIGN KEY (room_id) references room(room_id)
);
DROP TABLE child;


CREATE TABLE notes(
    note_id INT AUTO_INCREMENT,
    note VARCHAR(255),
    child_id INT,
    PRIMARY KEY (note_id),
    FOREIGN KEY (child_id) references child(child_id)
);
DROP TABLE notes;

CREATE TABLE review(
    review_id INT AUTO_INCREMENT,
    center_id INT,
    rating INT,
    text VARCHAR(255),
    PRIMARY KEY (review_id),
    FOREIGN KEY (center_id) references center(center_id)
);
DROP TABLE review;

CREATE TABLE child_room_history(
    child_id INT,
    room_id INT,
    PRIMARY KEY (child_id,room_id),
    FOREIGN KEY (child_id) references child(child_id),
    FOREIGN KEY (room_id) references room(room_id)
);
DROP TABLE child_room_history;



CREATE TABLE employee_room_history(
    employee_id INT,
    room_id INT,
    PRIMARY KEY (employee_id,room_id),
    FOREIGN KEY (employee_id) references employee(employee_id),
    FOREIGN KEY (room_id) references room(room_id)
);
DROP TABLE employee_room_history;


select * from parent;

INSERT INTO center (address, zip_code, name) VALUES (
'111 Test Ln.','00001','KIDSrUS'
);

INSERT INTO parent (parent_id,phone_number,name,email,center_id) values (
1,1111111111,'Test Guy','test@test.com',1
);

SELECT * FROM room;

INSERT INTO center;


SELECT * FROM center;
SELECT * FROM child;
SELECT * FROM room;

INSERT INTO room (room_name, center_id) VALUES (
'Away',1
);

DELETE FROM room where room_id = -1;
