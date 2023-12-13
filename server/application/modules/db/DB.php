<?php

class DB {
    private $db;
    function __construct() {
        $host = '127.0.0.1';
        $port = 4200;
        //$port = 3306;
        $user = 'root';
        $pass = '';
        $db = 'gym';

        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->db = new PDO($connect, $user, $pass);
    }

    function __destruct() {
        $this->db = null;
    }

    private function post($sql, $params = []) {
        return $this->db->prepare($sql)->execute($params);
    }

    private function query($sql, $params = []) {
        $obj = $this->db->prepare($sql);
        $obj->execute($params);
        return $obj->fetch(PDO::FETCH_OBJ);
    }

    private function queryAll($sql, $params = []) {
        $obj = $this->db->prepare($sql);
        $obj->execute($params);
        return $obj->fetchAll(PDO::FETCH_ASSOC);
    }

    function getUsers() {
        return $this->queryAll("SELECT * FROM users");
    }

    function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    function updateToken($userId, $token) {
        $this->post("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    function registration($login, $hash, $name, $surname) {
        $token = md5($login.$hash.rand(0, 10000));
        $this->post("INSERT INTO users(login, password, name, surname, token) VALUES(?,?,?,?,?)",
                    [$login, $hash, $name, $surname, $token]);
        return array($token);
    }

    function login($login, $pass) {
        $token = md5($login.$pass.rand(0, 100000));
        $this->post("UPDATE users SET token=? WHERE login=? ", [$token, $login]);
        return $this->queryAll("SELECT * FROM users WHERE login=? AND password=?",
            [$login, $pass]);
    }

    function sendMessage($userId, $message) {
        $this->post("INSERT INTO 
            messages(user_id, message, created) 
            VALUES (?, ?, now())",
        [$userId, $message]);
    }

    function getMessages() {
        return $this->queryAll("SELECT 
                m.message AS message,
                u.name AS name,
                u.surname AS surname
            FROM messages AS m
            INNER JOIN users AS u
            ON u.id=m.user_id
            ORDER BY m.created DESC");
    }

    function getPersons() {
        return $this->queryAll("SELECT * FROM persons");
    }

    function choosePerson($userId, $personId) {
        $this->post("DELETE FROM gamers WHERE user_id=?", [$userId]);
        $this->post("INSERT INTO gamers(user_id, score, health, person_id) VALUES(?,?,?)", [$userId, 100, $personId]);
        return true;
    }

    function updateGameHash($hash) {
        $this->post("UPDATE game SET gamers_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    function getHashes() {
        return $this->query("SELECT * FROM game WHERE id=1");
    }

    function changeScore($userId, $score) {
        $oldScore = $this->query("SELECT score FROM gamers WHERE user_id = ?", [$userId]);
        $newScore = $oldScore->score - $score;
        $this->post("UPDATE gamers SET score=? WHERE user_id=? ", [$newScore, $userId]);
        return $newScore;
    }

    function updateGamerHash($hash) {
        $this->post("UPDATE game SET gamers_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    function changeHealth($userId, $health) {
        $oldHealth = $this->query("SELECT health FROM gamers WHERE user_id = ?", [$userId]);
        $newHealth = $oldHealth->health + $health;
        $this->post("UPDATE gamers SET health=? WHERE user_id=? ", [$newHealth, $userId]);
        return $newHealth;
    }

    function getItems() {
        return $this->queryAll("SELECT name, length, width, x, y FROM items");
    }

    function getGamers() {
        return $this->queryAll("SELECT id, user_id, score, health, person_id, x, y, status FROM gamers");
    }

    function getGamerById($user_id) {
        return $this->queryAll("SELECT id, user_id, score, health, person_id, x, y, status FROM gamers WHERE user_id=? ", [$user_id]);
    }

    function setPersonPositionX($id, $x, $y) {
        $this->post("UPDATE gamers SET x=?, y=? WHERE user_id=? ", [$x, $y, $id]);
        return true;
    }

    function setGamerStatus($userId, $statusId) {
        $this->post("UPDATE gamers SET status=? WHERE user_id=? ", [$statusId, $userId]);
        return true;
    }
}