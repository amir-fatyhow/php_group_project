<?php

class Chat
{
    private $connection;

    function __constructor($connection) {
        $this->connection = $connection;

        $chat = "CREATE TABLE IF NOT EXISTS chat(
            id INT PRIMARY KEY AUTO_INCREMENT,
            login VARCHAR(255)
        )";
        $this->connection->query($chat);
    }
}