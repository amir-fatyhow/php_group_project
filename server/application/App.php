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
        return $this->user->login($params['login'], $params['password']);
    }

    function registration($params) {
        return $this->user->registration($params['login'], $params['password'], $params['name'], $params['surname']);
    }

    function getOnlineUsers($params) {
        return $this->onlineUsers->getOnlineUsers($params['roomId']);
    }

    function logout($params) {
        return $this->user->logout($params['login']);
    }
}
