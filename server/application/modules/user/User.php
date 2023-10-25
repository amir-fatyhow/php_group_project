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

    public function login($login, $pass)
    {
        $token = md5($login.$pass.rand(0, 10));
        $update = "UPDATE users SET token = '$token' WHERE login = ". "'" . $login . "'";

        $this->connection->query($update);

        $select = 'SELECT * FROM users WHERE users.login = "' . $login . '"' . 'AND users.password = "' . $pass . '"';
        $result = $this->connection->query($select);

        $answer = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $answer[] = $row;
            }
        }
        return $answer;
    }

    public function registration($login, $pass, $name, $surname)
    {
        $token = md5($login.$pass.rand(0, 10));
        $insert = "INSERT INTO users(login, password, user_name, user_surname, token) VALUES('$login','$pass','$name','$surname','$token')";

        $this->connection->query($insert);
        return $token;
    }

    function logout($login) {
        try {
            $query = "UPDATE users SET token = 'NULL' WHERE login = '$login'";
            $this->connection->query($query);
        } catch (Exception $ex){
            return false;
        }
        return true;
    }
}