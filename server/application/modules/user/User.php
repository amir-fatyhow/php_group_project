<?php

class User {
    
    private $db;

    function __construct($db) {
        $this->db = $db;
    }
// Публичный метод для получения пользователя по токену
    public function getUser($token) {
        
        return $this->db->getUserByToken($token);
    }
// Публичный метод для получения всех пользователей
    public function getUsers() {
        return $this->db->getUsers();
    }
// Публичный метод для регистрации нового пользователя
    public function registration($login, $pass, $name, $surname, $hashS) {
      
        $user = $this->db->getUserByLogin($login);
      
        $token = $this->genToken($login, $hashS);
        if ($user) {
            return null;
        }
        $this->db->registration($login, $pass, $name, $surname, $token);
        $currentUser = $this->db->getUserByToken($token);
        $this->db->setInitialScoreAndTiredness($currentUser->id);
        return $this->db->getToken($currentUser->id)->token;
    }
// Публичный метод для входа пользователя
    public function login($login, $pass, $hashS) {
        // Получает пользователя по логину
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            // Если пароль пользователя совпадает с введенным паролем
            if ($user->password === $pass) {
                $token = $this->genToken($login, $hashS);
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
// Метод для выхода пользователя
    function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return array(false, 4002);
    }

//метод для генерации токена
    private function genToken($login, $hashS) {
        return $token = md5($login.$hashS.rand(0, 100000));
    }
}