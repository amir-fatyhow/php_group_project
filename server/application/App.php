<?php
require_once('modules/db/DB.php');
require_once('modules/user/User.php');
require_once('modules/chat/Chat.php');
require_once('modules/game/Game.php');

class App {
    private $db;
    private $user;
    private $chat;
    private $game;

    function __construct() {
        $this->db = new DB();
        $this->user = new User($this->db);
        $this->chat = new Chat($this->db);
        $this->game = new Game($this->db);
    }

    function getUsers() {
        return $this->user->getUsers();
    }

    function login($params) {
        $login = $params['login'];
        $pass = $params['pass'];
        if ($login && $pass) {
            return $this->user->login($login, $pass);
        }
        return array(false, 2001);
    }

    function registration($params) {
        $login = $params['login'];
        $hash = $params['hash'];
        $name = $params['name'];
        $surname = $params['surname'];

        if($login && $name && $surname) {
            return $this->user->registration($login, $hash, $name, $surname);
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
        if ($token && $message) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->sendMessage($user->id, $message);
            }
            return array(false, 9000);
        }
        return array(false, 4001);
    }

    function getMessage($params) {
        $token = $params['token'];
        $hash = $params['hash'];
        if ($token && $hash) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->getMessages($hash);
            }
        }
        return [false, 9000];
    }

    function getPersons() {
        return $this->game->getPersons();
    }

    function choosePerson($params) {
        $token = $params['token'];
        $personId = $params['personId'];
        if ($token && $personId) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->choosePerson($user->id, $personId);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function changeScore($params) {
        $points = $params['points'];
        $token = $params['token'];
        if ($points && $token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeScore($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function getItems() {
        return $this->game->getItems();
    }
}
