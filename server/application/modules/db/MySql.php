<?php

class Mysql {
    private $connection;
    function __construct() {
        $server =  "localhost";
        $username = "root";
        $password = "";

        $this->connection = new mysqli($server, $username, $password);

        $sql = "CREATE DATABASE IF NOT EXISTS gym";

        if ($this->connection->query($sql) === true) {
            $this->connection = new mysqli($server, $username, $password, "gym");
        }

        $users = "CREATE TABLE IF NOT EXISTS users(
            id INT PRIMARY KEY AUTO_INCREMENT,
            login VARCHAR(255),
            password VARCHAR(255),
            user_name VARCHAR(255),
            user_surname VARCHAR(255),
            token VARCHAR(255)    
        )";
        $this->connection->query($users);

        $rooms = "CREATE TABLE IF NOT EXISTS rooms(
            id INT,
            name VARCHAR(255),
            size1 INT,
            size2 INT,
            gridDivision INT
        )";
        $this->connection->query($rooms);

        $items = "CREATE TABLE IF NOT EXISTS items(
            id INT,
            name VARCHAR(255)
        )";
        $this->connection->query($items);
    }

    public function getConnection() {
        return $this->connection;
    }
}