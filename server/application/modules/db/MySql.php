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
            password VARCHAR(255)
        )";

        $this->connection->query($users);
    }

    public function getConnection() {
        return $this->connection;
    }
}