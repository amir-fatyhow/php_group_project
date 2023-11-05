<?php

class User {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function getUsers() {
        return $this->db->getUsers();
    }

    public function registration($login, $pass, $name, $surname) {
        return $this->db->registration($login, $pass, $name, $surname);
    }

    public function login($login, $pass) {
        return $this->db->login($login, $pass);
    }

    function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return array(false, 4002);
    }
}