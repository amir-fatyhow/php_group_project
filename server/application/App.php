<?php
require_once('modules/db/Mysql.php');
require_once('modules/user/User.php');
require_once('modules/game/OnlineUsers.php');

class App {
    private $db;
    private $user;
    private $onlineUsers;

    function __construct() {
        $this->db = new Mysql();
        $this->user = new User($this->db->getConnection());
        $this->onlineUsers = new OnlineUsers($this->db->getConnection());
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

        if($login && $hash && $rnd && $name && $surname) {
            return $this->user->registration($login, $password, $name, $surname);
        }
        return array(false, 2003);
    }

    function getOnlineUsers($params) {
        $roomId = $params['roomId'];
        if($roomId) {
            return $this->onlineUsers->getOnlineUsers($roomId);
        }
        return array(false, 3001);
    }

    function logout($params) {
        $login = $params['login'];
        if($login){
            return $this->user->logout($login);
        }
        return array(false, 4001);
    }
}
