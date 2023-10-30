<?php

class Item
{
    private $connection;

    function __constructor($connection) {
        $this->connection = $connection;

        $items = "CREATE TABLE IF NOT EXISTS items(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255)
        )";
        $this->connection->query($items);
    }
}