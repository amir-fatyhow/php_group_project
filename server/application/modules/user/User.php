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

    public function registration($login, $pass, $name, $surname, $hashS) {
        $token = $this->genToken($login, $hashS);
        return $this->db->registration($login, $pass, $name, $surname, $token);
    }

    public function login($login, $pass, $hashS) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            if ($user->password === $pass) {
                $token = $this->genToken($login, $hashS);
                $this->db->updateToken($user->id, $token);
                return array(
                    'name' => $user->name,
                    'surname' => $user->surname,
                    'token' => $token,
                );
            }
            return ['error', 2002];
        }
        return ['error', 4001];
    }

    function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return array('error', 4002);
    }


    private function genToken($login, $hashS) {
        return $token = md5($login.$hashS.rand(0, 100000));
    }
}