CREATE DATABASE sample_crud;

USE sample_crud;

CREATE TABLE category (
    id INT IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255) NOT NULL
)