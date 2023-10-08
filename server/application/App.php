<?php
require_once('modules/db/Mysql.php');
require_once('modules/user/User.php');

class App {
    private $db;
    private $user;

    function __construct() {
        $this->db = new Mysql();
        $this->user = new User($this->db->getConnection());
    }

    function getUsers() {
        return $this->user->getUsers();
    }

    function postUser($params) {
        return $this->user->postUser($params['login'], $params['password']);
    }
}
