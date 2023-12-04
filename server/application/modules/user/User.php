<?php

class User {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function getUser($token) {
        return $this->db->getUserByToken($token);
    }

    public function getUsers() {
        return $this->db->getUsers();
    }

    public function registration($login, $pass, $name, $surname) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            return [false, 9000];
        }
        return $this->db->registration($login, $pass, $name, $surname);
    }

    public function login($login, $pass) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            if ($user->password === $pass) {
                $token = md5($login.$pass.rand(0, 100000));
                $this->db->updateToken($user->id, $token);
                return array(
                    'name' => $user->name,
                    'surname' => $user->surname,
                    'token' => $token,
                );
            }
            return [false, 9000];
        }
        return [false, 9000];
    }

    function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return array(false, 4002);
    }


    private function genToken($login, $hashS) {
        return $token = md5($login.$hashS.rand(0, 100000));;
    }
}