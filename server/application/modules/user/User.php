<?php

class User
{
    private $connection;

    function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getUsers()
    {
        $select = "SELECT * FROM users";
        $result = $this->connection->query($select);

        $answer = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $answer[] = $row;
            }
        }
        return $answer;
    }

    public function postUser($login, $pass)
    {
        $insert = "INSERT INTO users(login, password) VALUES('$login','$pass')";

        $this->connection->query($insert);
        return "added";
    }
}