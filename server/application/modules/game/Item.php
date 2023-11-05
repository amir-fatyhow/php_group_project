<?php

class Item
{
    private $connection;

    function __constructor($connection) {
        $this->connection = $connection;

        $items = "CREATE TABLE IF NOT EXISTS messages(
            id INT PRIMARY KEY AUTO_INCREMENT,
            token VARCHAR(255),
    		message VARCHAR(255),
    		created VARCHAR(255)
        )";

        $this->connection->query($items);
    }
}