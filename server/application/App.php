<?php
require_once('modules/db/DB.php');
require_once('modules/user/User.php');
require_once('modules/chat/Chat.php');

class App {
    private $db;
    private $user;
    private $chat;

    function __construct() {
        $this->db = new DB();
        $this->user = new User($this->db);
        $this->chat = new Chat($this->db);
    }

    function getUsers() {
        return $this->user->getUsers();
    }

    function login($params) {
        $login = $params['login'];
        $password = $params['password'];

        if($login && $password) {
            return $this->user->login($login, $password);
        }
        return array(false, 2001);
    }

    function registration($params) {
        $login = $params['login'];
        $password = $params['password'];
        $name = $params['name'];
        $surname = $params['surname'];

        if($login && $name && $surname) {
            return $this->user->registration($login, $password, $name, $surname);
        }
        return array(false, 2003);
    }

    function logout($params) {
        $token = $params['token'];
        if($token){
            return $this->user->logout($token);
        }
        return array(false, 4001);
    }

    function sendMessage($params) {
        $token = $params['token'];
        $message = $params['message'];
        if($token){
            return $this->chat->sendMessage($token, $message);
        }
        return array(false, 4001);
    }

    function getMessage() {
        return $this->chat->getMessage();
    }

    function getPersons() {
        return $this->user->getPersons();
    }

    function choosePerson($params) {
        $token = $params['token'];
        $personId = $params['personId'];
        return $this->user->choosePerson($token, $personId);
    }
}
