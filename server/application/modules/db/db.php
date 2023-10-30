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
    }

    public function getConnection() {
        return $this->connection;
    }
}