<?php

class DB {
    private $db;
    function __construct() {
        $host = '127.0.0.1';
        $port = 4200;
        //$port = 3306;
        $user = "root";
        $pass = "";
        $db = "gym";

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

    function registration($login, $hash, $name, $surname, $token) {
        $this->post("INSERT INTO users(login, password, name, surname, token) VALUES(?,?,?,?,?)",
            [$login, $hash, $name, $surname, $token]);
    }

    function getToken($userId) {
        return $this->query("SELECT token FROM users WHERE id=?", [$userId]);
    }

    function login($login, $pass, $token) {
        $this->post("UPDATE users SET token=? WHERE login=? ", [$token, $login]);
        return $this->queryAll("SELECT * FROM users WHERE login=? AND password=?", [$login, $pass]);
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

    function setInitialStateGamer($userId) {
        $this->post("UPDATE gamers SET score=?, tiredness=?, status=? WHERE user_id=?", [1, 1, 1, $userId]);
    }

    function setInitialScoreAndTiredness($userId) {
        $this->post("INSERT INTO gamers(user_id, score, tiredness, person_id, x, y, status, timestamp, timeout) VALUES(?,?,?,?,?,?,?,?,?)", [$userId, 1, 1, null, 0, 0, 1, 0, 300]);
    }

    function choosePerson($userId, $personId) {
        $this->post("UPDATE gamers SET person_id=? WHERE user_id=?", [$personId, $userId]);
    }

    function deleteGamer($userId) {
        $this->post("DELETE FROM gamers WHERE user_id=?", [$userId]);
        return true;
    }

    function updateChatHash($hash) {
        $this->post("UPDATE game SET chat_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    function updateGameHash($hash) {
        $this->post("UPDATE game SET game_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    function getHashes() {
        return $this->query("SELECT * FROM game WHERE id=1");
    }

    function changeScore($userId, $newScore) {
        $this->post("UPDATE gamers SET score=? WHERE user_id=? ", [$newScore, $userId]);
        return $newScore;
    }

    function changeTiredness($userId, $tiredness) {
        $this->post("UPDATE gamers SET tiredness=? WHERE user_id=? ", [$tiredness, $userId]);
        return $tiredness;
    }

    function updateGamerHash($hash) {
        $this->post("UPDATE game SET gamers_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    function updateItemsHash($hash) {
        $this->post("UPDATE game SET items_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    function getItems() {
        return $this->queryAll("SELECT name, length, width, x, y FROM items");
    }

    function getItem($id) {
        return $this->query("SELECT name, length, width, x, y FROM items WHERE id=?", [$id]);
    }
    
    function getGamerById($user_id) {
        return $this->query("SELECT * FROM gamers WHERE user_id=? ", [$user_id]);
    }
    
    function setPersonPosition($id, $x, $y) {
        $this->post("UPDATE gamers SET x=?, y=? WHERE user_id=? ", [$x, $y, $id]);
        return true;
    }
    
    function setGamerStatus($userId, $statusId) {
        $this->post("UPDATE gamers SET status=? WHERE user_id=? ", [$statusId, $userId]);
        return true;
    }
    
    function updateTimestamp($currentTimestamp) {
        $this->post("UPDATE game SET timestamp=? WHERE id=? ", [$currentTimestamp, 1]);
        return true;
    }
    
    function getStatusOfItem($id) {
        return $this->query("SELECT isUsed FROM items WHERE id=?", [$id]);
    }
    
    function changeStatusOfItem($isUsed, $id) {
        $this->query("UPDATE items SET isUsed=? WHERE id=? ", [$isUsed, $id]);
        return true;
    }
    
    function getTirednessByUserId($userId) {
        return $this->query("SELECT tiredness FROM gamers WHERE user_id=?", [$userId]);
    }
    
    function decreaseTirednessByUserId($userId, $tiredness) {
        $this->post("UPDATE gamers SET tiredness=? WHERE user_id=? ", [$tiredness, $userId]);
        return true;
    }
    
    function increaseTirednessByUserId($userId, $tiredness) {
        $this->post("UPDATE gamers SET tiredness=? WHERE user_id=? ", [$tiredness, $userId]);
        return true;
    }
    
    function getScoreByUserId($userId) {
        return  $this->query("SELECT score FROM gamers WHERE user_id=?", [$userId]);
    }
    
    function getStatusAllItems() {
        return  $this->queryAll("SELECT isUsed FROM items", []);
    }
    
    function getBestGamerById($userId) {
        return $this->query("SELECT score FROM best_gamers WHERE user_id=?", [$userId]);
    }
    
    function deleteBestGamerById($userId) {
        $this->post("DELETE FROM best_gamers WHERE user_id=?", [$userId]);
        return true;
    }
    
    function setBestGamers($userId, $points) {
        $this->post("INSERT INTO best_gamers(user_id, score)  VALUES(?,?)", [$userId, $points]);
        return true;
    }
    
    function getBestGamers() {
        return $this->queryAll("SELECT u.name, u.surname, bg.score FROM best_gamers AS bg JOIN users AS u WHERE u.id = bg.user_id ORDER BY score DESC", []);
    }
    
    function getGamers($token) {
        return $this->queryAll("SELECT u.login, g.x, g.y FROM gamers AS g JOIN users AS u WHERE u.id = g.user_id AND u.token != ?", [$token]);
    }
}