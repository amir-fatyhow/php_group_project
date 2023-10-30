<?php

class Room
{
    private $connection;

    function __constructor($connection) {
        $this->connection = $connection;

        $rooms = "CREATE TABLE IF NOT EXISTS rooms(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255),
            size1 INT,
            size2 INT,
            gridDivision INT
        )";
        $this->connection->query($rooms);
    }
}