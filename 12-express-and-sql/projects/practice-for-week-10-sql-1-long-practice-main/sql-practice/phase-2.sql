-- Your code here
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40),
    phone NUMERIC(10) UNIQUE,
    email VARCHAR(255) UNIQUE,
    points int NOT NULL DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS coffee_orders;

CREATE TABLE coffee_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    is_redeemed BOOLEAN DEFAULT 0,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO customers (name, phone)
    VALUES 
        ("Rachel", 1111111111);


