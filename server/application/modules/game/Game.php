<?php

class Game
{
    private $db;  // приватное свойство для хранения экземпляра класса базы данных

    function __construct($db) {
        $this->db = $db;  // конструктор класса, принимает экземпляр класса базы данных и сохраняет его в свойстве $db
    }

    function getPersons() {
        return $this->db->getPersons();  // метод для получения списка персонажей из базы данных
    }

    function choosePerson($userId, $personId) {
        $this->db->choosePerson($userId, $personId);  // метод для выбора персонажа пользователем
        return true;  // возвращаем значение true, чтобы показать, что выбор персонажа прошел успешно
    }

    function changeScore($userId, $points) {
        $currentScore = $this->db->getScoreByUserId($userId)->score;  // получаем текущий счет пользователя из базы данных
        $score = $currentScore + $points;  // увеличиваем счет пользователя на заданное количество очков
        return $this->db->changeScore($userId, $score);  // обновляем счет пользователя в базе данных
    }

    function changeHealth($userId, $points) {
        return $this->db->changeHealth($userId, $points);  // метод для изменения состояния здоровья пользователя
    }

    function getItems() {
        return $this->db->getItems();  // метод для получения списка предметов из базы данных
    }

    function getItem($id) {
        return $this->db->getItem($id);  // метод для получения информации о предмете по его идентификатору
    }

    function getGamers() {
        return $this->db->getGamers();  // метод для получения списка игроков из базы данных
    }

    function setPersonPosition($id, $x, $y) {
        $user = $this->db->getGamerById($id);  // получаем информацию о пользователе из базы данных по его идентификатору
        $currentTimestamp = time();  // получаем текущую метку времени
        if ($currentTimestamp - $user->timestamp >= $user->timeout) {  // проверяем, прошло ли достаточно времени с момента последнего обновления позиции пользователя
            $hash = md5('hashMessage'.rand(0, 100000));  // генерируем хеш-строку
            $this->db->updateGamerHash($hash);  // обновляем хеш-строку пользователя в базе данных
            $this->db->setPersonPosition($id, $x, $y);  // устанавливаем новую позицию пользователя в базе данных
        }
        return true;  // возвращаем значение true, чтобы показать, что позиция пользователя успешно обновлена
    }

    function setGamerStatus($userId, $statusId) {
        return $this->db->setGamerStatus($userId, $statusId);  // метод для изменения статуса пользователя
    }

    // Функция для обновления сцены игры
    function updateScene($userId, $timestamp, $timeout) {
    $currentTimestamp = time(); // Получаем текущий timestamp (количество секунд, прошедших с 1 января 1970 года)
    if ($currentTimestamp - $timestamp >= $timeout) { // Если прошло больше времени, чем заданное время ожидания
    $this->db->updateTimestamp($currentTimestamp); // Обновляем timestamp в базе данных
    $user = $this->db->getGamerById($userId); // Получаем информацию о пользователе из базы данных
    if($user->status === 2){ // Если статус пользователя равен 2 (код для удаления)
    $this->db->deleteGamer($userId); // Удаляем пользователя из базы данных
    }

    $this->db->changeScore($userId, 2); // Увеличиваем счет пользователя на 2
    $user = $this->db->getGamerById($userId); // Получаем обновленную информацию о пользователе из базы данных
    if ($user->health <= 0) { // Если здоровье пользователя меньше или равно 0
        $this->setGamerStatus($userId, 2); // Устанавливаем статус пользователя равным 2 (код для удаления)
    }

    $hash = md5('hashMessage'.rand(0, 100000)); // Генерируем случайный hash
    $this->db->updateGameHash($hash); // Обновляем hash игры в базе данных
}
}
// Функция для получения сцены игры
function getScene($userId, $gamersHash, $itemsHash) {
    $result = array(); // Создаем пустой массив для результата
    $game = $this->db->getHashes(); // Получаем хеши из базы данных
    $this->updateScene($userId, $game->timestamp, $game->timeout); // Вызываем функцию обновления сцены игры
    if ($gamersHash !== $game->gamers_hash) { // Если хеш игроков не совпадает с хешем из базы данных
    $result['gamers'] = $this->getGamers(); // Получаем информацию об игроках
    $result['gamersHash'] = $game->gamers_hash; // Добавляем хеш игроков в результат
    }
    if ($itemsHash !== $game->items_hash) { // Если хеш предметов не совпадает с хешем из базы данных
    $result['items'] = $this->getItems(); // Получаем информацию о предметах
    $result['itemsHash'] = $game->items_hash; // Добавляем хеш предметов в результат
    }
    return $result; // Возвращаем результат
    }
    
    // Функция для получения статуса предмета по его id
    function getStatusOfItem($id) {
    return $this->db->getStatusOfItem($id)->isUsed; // Получаем статус предмета (используется или нет)
    }
    
    // Функция для изменения статуса предмета
    function changeStatusOfItem($isUsed, $id) {
    return $this->db->changeStatusOfItem($isUsed, $id); // Изменяем статус предмета
    }
    
    // Функция для обновления хеша игры
    function updateGameHash() {
    $hash = md5('hashGame'.rand(0, 100000)); // Генерируем случайный hash
    return $this->db->updateGameHash($hash); // Обновляем hash игры в базе данных
    }
    
    // Функция для обновления хеша предметов
    function updateItemsHash() {
    $hash = md5('hashItem'.rand(0, 100000)); // Генерируем случайный hash
    return $this->db->updateItemsHash($hash); // Обновляем hash предметов в базе данных
    }

    function decreaseTiredness($userId) {
        $currentTiredness = $this->db->getTirednessByUserId($userId)->health;
        // Получаем текущую усталость пользователя по его идентификатору
        if ($currentTiredness > 10) {
            $tiredness = $currentTiredness - 10;
            // Если текущая усталость больше 10, то уменьшаем усталость на 10
            return $this->db->decreaseTirednessByUserId($userId, $tiredness);
            // Обновляем значение усталости в базе данных для данного пользователя
        } else {
            return $this->db->decreaseTirednessByUserId($userId, 1);
            // В противном случае уменьшаем усталость на 1
        }
    }
    
    function increaseTiredness($userId, $points) {
        $currentTiredness = $this->db->getTirednessByUserId($userId)->health;
        // Получаем текущую усталость пользователя по его идентификатору
        $tiredness = $currentTiredness + $points;
        // Увеличиваем усталость на заданное количество очков
        return $this->db->increaseTirednessByUserId($userId, $tiredness);
        // Обновляем значение усталости в базе данных для данного пользователя
    }
    
    function getTirednessByUserId($userId) {
        return $this->db->getTirednessByUserId($userId)->health;
        // Получаем значение текущей усталости пользователя по его идентификатору
    }
    
    function getScoreByUserId($userId) {
        return $this->db->getScoreByUserId($userId)->score;
        // Получаем значение текущего счета пользователя по его идентификатору
    }
    
    function changeGamerHash() {
        $hash = md5('changeGamerHash'.rand(0, 100000));
        // Генерируем хэш для игрока
        return $this->db->updateGamerHash($hash);
        // Обновляем значение хэша в базе данных для игрока
    }
    
    function changeItemsHash() {
        $hash = md5('changeItemsHash'.rand(0, 100000));
        // Генерируем хэш для предметов
        return $this->db->updateItemsHash($hash);
        // Обновляем значение хэша в базе данных для предметов
    }
    
    function getItemsHash() {
        return $this->db->getHashes()->items_hash;
        // Получаем значение хэша для предметов из базы данных
    }
    
    function getStatusAllItems() {
        return $this->db->getStatusAllItems();
        // Получаем статус всех предметов из базы данных
    }
    
    function setBestGamers($userId, $points) {
        $oldScore = $this->db->getBestGamerById($userId)->score;
        // Получаем старый счет пользователя по его идентификатору
        if ($oldScore < $points) {
            $this->db->deleteBestGamerById($userId);
            // Если новый счет больше старого, то удаляем старый счет из базы данных
            return $this->db->setBestGamers($userId, $points);
            // Устанавливаем новый счет для пользователя в базе данных
        }
        return false;
        // Если новый счет меньше или равен старому, возвращаем false
    }
    
    function setInitialStateGamer($userId) {
        $this->db->setInitialStateGamer($userId);
        // Устанавливаем начальное состояние игрока в базе данных
        return true;
    }
    
    function getBestGamers() {
        $gamers = $this->db->getBestGamers();
        // Получаем информацию о лучших игроках из базы данных
        return $gamers;
    }
}