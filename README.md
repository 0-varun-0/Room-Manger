# Hotel Room Manager

A sleek hotel room management app using Node.js, Express, and MySQL.

## Features

- View status of 20 rooms
- Book rooms with occupant names
- Checkout and update status instantly
- Clean UI with gradients
- Fully integrated frontend and backend

## Project Structure

hotel-room-manager/
├── server.js  
├── db.js  
├── routes/  
│   └── rooms.js  
├── public/  
│   ├── index.html  
│   ├── style.css  
│   └── script.js  
├── package.json  
└── README.md  

## MySQL Setup

CREATE DATABASE hotel;

USE hotel;

CREATE TABLE rooms (
  room_number INT PRIMARY KEY,
  occupant_name VARCHAR(100),
  is_occupied BOOLEAN DEFAULT FALSE
);

INSERT INTO rooms (room_number, occupant_name, is_occupied)
SELECT n, NULL, FALSE FROM (
  SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION
  SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION
  SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION
  SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
) AS temp;

## Installation

git clone https://github.com/yourusername/hotel-room-manager.git  
cd hotel-room-manager  
npm install  

## Run

node server.js  
Visit http://localhost:3000  

## API Routes

GET /api/rooms — Get all room data  
POST /api/book — Book a room  
POST /api/checkout — Checkout a room  

## Author

Created by ME
