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

    public function registration($login, $hashPass, $name, $surname) {
        $user = $this->db->getUserByLogin($login);
        $token = $this->genToken($login, $hashPass);
        if ($user) {
            return null;
        }
        $this->db->registration($login, $hashPass, $name, $surname, $token);
        $currentUser = $this->db->getUserByToken($token);
        $this->db->setInitialScoreAndTiredness($currentUser->id);
        return $this->db->getToken($currentUser->id)->token;
    }

    public function login($login, $hashPass, $rnd) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            $checker = md5($user->password.$rnd);
            if ($checker === $hashPass) {
                $token = $this->genToken($login, $hashPass);
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
        return $token = md5($login.$hashS.rand(0, 100000));
    }
}