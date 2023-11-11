<?php

class DB {
    private $db;
    function __construct() {
        $host = '127.0.0.1';
        $port = 4200;
        $name = 'root';
        $pass = '';
        $db = 'gym';
        $this->db = new mysqli($host, $name, $pass, $db, $port);

        if ($this->db->connect_errno) {
            echo "Failed to connect to MySQL: " . $this->db->connect_error;
            exit();
        }
    }

    function __destruct() {
        $this->db->close();
    }

    function getUsers() {
        $select = "SELECT * FROM users";
        $result = $this->db->query($select);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $answer[] = $row;
            }
            return $answer;
        }
        return array(false, 4001);
    }

    function getUserByLogin($login) {
        $query = "SELECT * FROM users WHERE login='$login'";
        $result = $this->db->query($query);
        return $result->fetch_object();
    }

    function getUserByToken($token) {
        $query = "SELECT * FROM users WHERE token='$token'";
        $result = $this->db->query($query);
        return $result->fetch_object();
    }

    function updateToken($userId, $token) {
        $query = "UPDATE users SET token='$token' WHERE id='$userId'";
        $isGood = $this->db->query($query);
        if (!$isGood) {
            return array(false, 2002);
        }
        return true;
    }

    function registration($login, $pass, $name, $surname) {
        $token = md5($login.$pass.rand(0, 10));
        $query = "INSERT INTO users(login, password, user_name, user_surname, token) VALUES('$login','$pass','$name','$surname','$token')";

        $this->db->query($query);
        return $token;
    }

    function login($login, $pass) {
        $token = md5($login.$pass.rand(0, 10));
        $query = "UPDATE users SET token = '$token' WHERE login = ". "'" . $login . "'";

        $this->db->query($query);

        $select = 'SELECT * FROM users WHERE users.login = "' . $login . '"' . 'AND users.password = "' . $pass . '"';
        $result = $this->db->query($select);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $answer[] = $row;
            }
            return $answer;
        }
        return array(false, 2002);
    }

    function sendMessage($token, $message) {
        date_default_timezone_set('Australia/Melbourne');
        $created = date('m/d/Y h:i:s a', time());
        $query = "INSERT INTO messages(token, message, created) VALUES('$token','$message','$created')";
        if ($this->db->query($query)){
            return true;
        }
        return false;
    }

    function getMessage() {
        $query = "SELECT u.user_name, u.user_surname, m.message, m.created FROM messages AS m
                    JOIN users AS u ON m.token = u.token";
        $result = $this->db->query($query);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $answer[] = $row;
            }
            return $answer;
        }
        return array();
    }

    // http://server/?method=getPersons
    function getPersons() {
        $query = "SELECT * FROM persons";
        $result = $this->db->query($query);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $answer[] = $row;
            }
            return $answer;
        }
        return array();
    }

    function choosePerson($token, $personId) {
        $query = "INSERT INTO gamers(token, score, person_id) VALUES('$token','100','$personId')";
        $result = $this->db->query($query);
        if ($result) {
            return true;
        }
        return false;
    }
}