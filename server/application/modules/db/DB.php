<?php

class DB {
    // Объект для подключения к базе данных 
    private $db;
    // Метод для установки соединения с базой данных при создании объекта класса 
    function __construct() {
        // Адрес хоста базы данных 
        $host = '127.0.0.1'; 
        // Порт для подключения к базе данных  
        $port = 4200;
        // Имя пользователя базы данных 
        $user = "root";
        // Пароль для подключения к базе данных 
        $pass = "";
        // Имя базы данных 
        $db = "gym";
        // Строка подключения к базе данных
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        // Инициализация объекта для подключения к базе данных 
        $this->db = new PDO($connect, $user, $pass);
    }

    // Метод для закрытия соединения с базой данных при уничтожении объекта класса
    function __destruct() {
        // Закрытие соединения с базой данных
        $this->db = null;
    }

    // Метод для выполнения запроса без получения данных
    private function post($sql, $params = []) {
        return $this->db->prepare($sql)->execute($params);
    }

    // Подготовка запроса к выполнению и выполнение запроса 
    private function query($sql, $params = []) {
        $obj = $this->db->prepare($sql);
        $obj->execute($params);
        // Подготовка запроса к выполнению и выполнение запроса 
        return $obj->fetch(PDO::FETCH_OBJ);
    }

    // Метод для выполнения запроса и получения всех записей из базы
    private function queryAll($sql, $params = []) {
        $obj = $this->db->prepare($sql);
        $obj->execute($params);
        // Возвращение результата запроса в виде ассоциативного массива
        return $obj->fetchAll(PDO::FETCH_ASSOC);
    }

    // Метод для получения всех пользователей из базы
    function getUsers() {
        return $this->queryAll("SELECT * FROM users");
    }

    // Метод для получения пользователя по логину 
    function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    // Метод для получения пользователя по токену 
    function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    // Метод для обновления токена пользователя
    function updateToken($userId, $token) {
        // Выполнение запроса к базе данных с использованием подстановки параметров 
        $this->post("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    // Метод для регистрации нового пользователя 
    function registration($login, $hashPass, $name, $surname, $token) {
        // Выполнение запроса к базе данных с использованием подстановки параметров 
        $this->post("INSERT INTO users(login, password, name, surname, token) VALUES(?,?,?,?,?)",
            [$login, $hashPass, $name, $surname, $token]);
    }

    // Метод для получения токена пользователя 
    function getToken($userId) {
        return $this->query("SELECT token FROM users WHERE id=?", [$userId]);
    }

    // Метод для выполнения входа пользователя 
    function login($login, $hashPass, $token) {
        $this->post("UPDATE users SET token=? WHERE login=? ", [$token, $login]);
        return $this->queryAll("SELECT * FROM users WHERE login=? AND password=?", [$login, $hashPass]);
    }

    // Метод для отправки сообщения пользователю 
    function sendMessage($userId, $message) {
        $this->post("INSERT INTO 
            messages(user_id, message, created) 
            VALUES (?, ?, now())",
            [$userId, $message]);
    }

    // Метод для получения всех сообщений из чата 
    function getMessages() {
        return $this->queryAll("SELECT 
                m.message AS message,
                u.name AS name,
                u.surname AS surname
            FROM messages AS m
            INNER JOIN users AS u
            ON u.id=m.user_id
            ORDER BY m.created DESC");
    }

    // Метод для получения всех персон 
    function getPersons() {
        return $this->queryAll("SELECT * FROM persons");
    }

    function getPerson($id) {
        return $this->query("SELECT type FROM persons WHERE id=?", [$id])->type;
    }
    
    // Метод для установки начального состояния игрока
    function setInitialStateGamer($userId) {
        $this->post("UPDATE gamers SET score=?, tiredness=?, status=? WHERE user_id=?", [1, 1, 1, $userId]);
    }

    // Метод для установки начального счета и усталости игрока
    function setInitialScoreAndTiredness($userId) {
        $this->post("INSERT INTO gamers(user_id, score, tiredness, person_id, x, y, status, timestamp, timeout) VALUES(?,?,?,?,?,?,?,?,?)", [$userId, 1, 1, null, 0, 0, 1, 0, 300]);
    }

    // Метод для выбора персоны игрока 
    function chooseSkin($userId, $skinId) {
        $this->post("UPDATE gamers SET person_id=? WHERE user_id=?", [$skinId, $userId]);
    }

    function setSkin($userId) {
        $skinID = $this->query("SELECT person_id FROM gamers WHERE user_id=?", [$userId])->person_id;
        return $this->getPerson($skinID);
    }

    // Метод для удаления игрока 
    function deleteGamer($userId) {
        $this->post("DELETE FROM gamers WHERE user_id=?", [$userId]);
        return true;
    }

    //функция обновляет значение поля chat_hash в таблице game с идентификатором 1.
    function updateChatHash($hash) {
        $this->post("UPDATE game SET chat_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    //обновляет значение поля game_hash вместо chat_hash в таблице game
    function updateGameHash($hash) {
        $this->post("UPDATE game SET game_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    //функция выполняет запрос SELECT, возвращающий все поля из таблицы game с идентификатором 1
    function getHashes() {
        return $this->query("SELECT * FROM game WHERE id=1");
    }

    //функция обновляет значение поля score для указанного userId в таблице gamers
    function changeScore($userId, $newScore) {
        $this->post("UPDATE gamers SET score=? WHERE user_id=? ", [$newScore, $userId]);
        return $newScore;
    }

    //обновляет значение поля tiredness вместо score в таблице gamers
    function changeTiredness($userId, $tiredness) {
        $this->post("UPDATE gamers SET tiredness=? WHERE user_id=? ", [$tiredness, $userId]);
        return $tiredness;
    }

    //Функция обновляет хэш игрока в таблице "game"
    function updateGamerHash($hash) {
        $this->post("UPDATE game SET gamers_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    //Функция обновляет хэш предметов в таблице "game"
    function updateItemsHash($hash) {
        $this->post("UPDATE game SET items_hash=? WHERE id=?", [$hash, 1]);
        return true;
    }

    //Функция возвращает данные о предмете с указанным идентификатором из таблицы "items"
    function getItem($id) {
        return $this->query("SELECT name, length, width, x, y FROM items WHERE id=?", [$id]);
    }
    
    //Функция возвращает данные об игроке с указанным идентификатором пользователя из таблицы "gamers"
    function getGamerById($user_id) {
        return $this->query("SELECT * FROM gamers WHERE user_id=? ", [$user_id]);
    }
    
    //Функция обновляет позицию игрока в таблице "gamers". Она принимает идентификатор игрока, координаты X и Y в качестве параметров и обновляет их для данного игрока
    function setPersonPosition($id, $x, $y) {
        $this->post("UPDATE gamers SET x=?, y=? WHERE user_id=? ", [$x, $y, $id]);
        return true;
    }
    
    //Функция обновляет статус игрока в таблице "gamers". Она принимает идентификатор пользователя 
    //и идентификатор статуса в качестве параметров и обновляет статус игрока для данного пользователя.
    function setGamerStatus($userId, $statusId) {
        $this->post("UPDATE gamers SET status=? WHERE user_id=? ", [$statusId, $userId]);
        return true;
    }
    
    //Функция обновляет метку времени в таблице "game".
    function updateTimestamp($currentTimestamp) {
        $this->post("UPDATE game SET timestamp=? WHERE id=? ", [$currentTimestamp, 1]);
        return true;
    }
    
    //Функция возвращает статус использования предмета с указанным идентификатором из таблицы "items"
    function getStatusOfItem($id) {
        return $this->query("SELECT isUsed FROM items WHERE id=?", [$id]);
    }
    
    //Функция изменяет статус использования предмета в таблице "items".
    function changeStatusOfItem($isUsed, $id) {
        $this->query("UPDATE items SET isUsed=? WHERE id=? ", [$isUsed, $id]);
        return true;
    }
    
    //Функция возвращает уровень усталости игрока с указанным идентификатором пользователя из таблицы "gamers"
    function getTirednessByUserId($userId) {
        return $this->query("SELECT tiredness FROM gamers WHERE user_id=?", [$userId]);
    }
    
    //Функция уменьшает уровень усталости игрока в таблице "gamers". Она принимает идентификатор пользователя и новый уровень усталости в качестве параметров и обновляет уровень
    function decreaseTirednessByUserId($userId, $tiredness) {
        $this->post("UPDATE gamers SET tiredness=? WHERE user_id=? ", [$tiredness, $userId]);
        return true;
    }
    
    // Увеличивает уровень усталости пользователя по его идентификатору
    function increaseTirednessByUserId($userId, $tiredness) {
        $this->post("UPDATE gamers SET tiredness=? WHERE user_id=? ", [$tiredness, $userId]);
        return true;
    }
    
    // Получает счет пользователя по его идентификатору
    function getScoreByUserId($userId) {
        return  $this->query("SELECT score FROM gamers WHERE user_id=?", [$userId]);
    }
    
    // Получает статус использования всех предметов
    function getStatusAllItems() {
        return  $this->queryAll("SELECT isUsed FROM items", []);
    }
    
    // Получает лучшего игрока по его идентификатору
    function getBestGamerById($userId) {
        return $this->query("SELECT score FROM best_gamers WHERE user_id=?", [$userId]);
    }
    
    // Удаляет лучшего игрока по его идентификатору
    function deleteBestGamerById($userId) {
        $this->post("DELETE FROM best_gamers WHERE user_id=?", [$userId]);
        return true;
    }
    
    // Устанавливает лучших игроков (добавляет запись)
    function setBestGamers($userId, $points) {
        $this->post("INSERT INTO best_gamers(user_id, score)  VALUES(?,?)", [$userId, $points]);
        return true;
    }
    
    // Получает лучших игроков с информацией о пользователе
    function getBestGamers() {
        return $this->queryAll("SELECT u.name, u.surname, bg.score FROM best_gamers AS bg JOIN users AS u WHERE u.id = bg.user_id ORDER BY score DESC", []);
    }
    
    // Получает информацию о пользователях и их координатах
    function getGamers($token) {
        return $this->queryAll("SELECT u.login, g.x, g.y, g.person_id FROM gamers AS g JOIN users AS u WHERE u.id = g.user_id AND u.token != ?", [$token]);
    }

    //Функция возвращает все данные о предметах из таблицы "items"
    function getItems() {
        return $this->queryAll("SELECT name, length, width, x, y FROM items");
    }

    function getVelocity($userId) {
        return $this->query("SELECT velocity FROM gamers WHERE user_id=?", [$userId]);
    }

    function getUserIdByToken($token) {
        return $this->query("SELECT id FROM users WHERE token=?", [$token])->id;
    }

    function isUserFreeze($userId) {
        return $this->query("SELECT freeze FROM gamers WHERE user_id=?", [$userId]);
    }

    function getPersonPosition($userId) {
        return $this->query("SELECT g.x, g.y FROM gamers AS g WHERE user_id=?", [$userId]);
    }

    function isTeleported($userId) {
        return $this->query("SELECT isTeleported FROM gamers WHERE user_id=?", [$userId]);
    }
}