<?php

class Game
{
    // приватное свойство для хранения экземпляра класса базы данных
    private $db;  

    function __construct($db) {
       // конструктор класса, принимает экземпляр класса базы данных и сохраняет его в свойстве $db
        $this->db = $db;  
    }

    function getPersons() {
        // метод для получения списка персонажей из базы данных
        return $this->db->getPersons();  
    } 

    function choosePerson($userId, $personId) {
        // метод для выбора персонажа пользователем
        $this->db->choosePerson($userId, $personId);  
        return true;  
    }

    function changeScore($userId, $points) {
        // получаем текущий счет пользователя из базы данных
        $currentScore = $this->db->getScoreByUserId($userId)->score;  
        // увеличиваем счет пользователя на заданное количество очков
        $score = $currentScore + $points;  
        // обновляем счет пользователя в базе данных
        return $this->db->changeScore($userId, $score);  
    }

    function changeTiredness($userId, $points) {
        return $this->db->changeTiredness($userId, $points);
    }

    function getItems() { 
        // метод для получения списка предметов из базы данных
        return $this->db->getItems(); 
    }

    function getItem($id) {
        // метод для получения информации о предмете по его идентификатору
        return $this->db->getItem($id);  
    }

    function getGamers() {
        // метод для получения списка игроков из базы данных
        return $this->db->getGamers();  
    }

    function setPersonPosition($id, $x, $y) {
        // получаем информацию о пользователе из базы данных по его идентификатору
        $user = $this->db->getGamerById($id); 
         // получаем текущую метку времени
        $currentTimestamp = time();  
        // проверяем, прошло ли достаточно времени с момента последнего обновления позиции пользователя
        if ($currentTimestamp - $user->timestamp >= $user->timeout) {  
            // генерируем хеш-строку
            $hash = md5('hashMessage'.rand(0, 100000)); 
            // обновляем хеш-строку пользователя в базе данных 
            $this->db->updateGamerHash($hash); 
             // устанавливаем новую позицию пользователя в базе данных
            $this->db->setPersonPosition($id, $x, $y);  
        }
        return true;  
    }

    function setGamerStatus($userId, $statusId) {
        // метод для изменения статуса пользователя
        return $this->db->setGamerStatus($userId, $statusId);  
    }

    // Функция для обновления сцены игры
    function updateScene($userId, $timestamp, $timeout) {
        $currentTimestamp = time();
        if ($currentTimestamp - $timestamp >= $timeout) {
            $this->db->updateTimestamp($currentTimestamp);
            $user = $this->db->getGamerById($userId);
            if($user->status === 2){
                $this->db->deleteGamer($userId);
            }

            $this->db->changeScore($userId, 2);
            $user = $this->db->getGamerById($userId);
            if ($user->tiredness <= 0) {
                $this->setGamerStatus($userId, 2);
            }

            $hash = md5('hashMessage'.rand(0, 100000));
            $this->db->updateGameHash($hash);
        }
    }

    function getScene($userId, $gamersHash, $itemsHash) {
        $result = array();
        $game = $this->db->getHashes();
        $this->updateScene($userId, $game->timestamp, $game->timeout);
        if ($gamersHash !== $game->gamers_hash) {
            $result['gamers'] = $this->getGamers();
            $result['gamersHash'] = $game->gamers_hash;
        }
        if ($itemsHash !== $game->items_hash) {
            $result['items'] = $this->getItems();
            $result['itemsHash'] = $game->items_hash;
        }
        return $result;
    }

    function getStatusOfItem($id) {
    // Получаем статус предмета (используется или нет)
    return $this->db->getStatusOfItem($id)->isUsed; 
    }
    
    // Функция для изменения статуса предмета
    function changeStatusOfItem($isUsed, $id) {
    // Изменяем статус предмета
    return $this->db->changeStatusOfItem($isUsed, $id); 
    }
    
    // Функция для обновления хеша игры
    function updateGameHash() {
    // Генерируем случайный hash
    $hash = md5('hashGame'.rand(0, 100000)); 
    // Обновляем hash игры в базе данных
    return $this->db->updateGameHash($hash); 
    }
    
    // Функция для обновления хеша предметов
    function updateItemsHash() {
    // Генерируем случайный hash
    $hash = md5('hashItem'.rand(0, 100000));  
    // Обновляем hash предметов в базе данных
    return $this->db->updateItemsHash($hash);
    }

    function decreaseTiredness($userId) {
        $currentTiredness = $this->db->getTirednessByUserId($userId)->tiredness;
        if ($currentTiredness > 10) {
            // Если текущая усталость больше 10, то уменьшаем усталость на 10
            $tiredness = $currentTiredness - 10;
            // Обновляем значение усталости в базе данных для данного пользователя
            return $this->db->decreaseTirednessByUserId($userId, $tiredness);
            
        } else {
            // В противном случае уменьшаем усталость на 1
            return $this->db->decreaseTirednessByUserId($userId, 1);
            
        }
    }
    
    function increaseTiredness($userId, $points) {
        $currentTiredness = $this->db->getTirednessByUserId($userId)->tiredness;
        $tiredness = $currentTiredness + $points;
        // Обновляем значение усталости в базе данных для данного пользователя
        return $this->db->increaseTirednessByUserId($userId, $tiredness);
        
    }
    
    function getTirednessByUserId($userId) {
        return $this->db->getTirednessByUserId($userId)->tiredness;
    }
    
    function getScoreByUserId($userId) {
        // Получаем значение текущего счета пользователя по его идентификатору
        return $this->db->getScoreByUserId($userId)->score;
        
    }
    
    function changeGamerHash() {
        // Генерируем хэш для игрока
        $hash = md5('changeGamerHash'.rand(0, 100000));
        // Обновляем значение хэша в базе данных для игрока
        return $this->db->updateGamerHash($hash);
        
    }
    
    function changeItemsHash() {
        // Генерируем хэш для предметов
        $hash = md5('changeItemsHash'.rand(0, 100000));
        // Обновляем значение хэша в базе данных для предметов
        return $this->db->updateItemsHash($hash);
        
    }
    
    function getItemsHash() {
        // Получаем значение хэша для предметов из базы данных
        return $this->db->getHashes()->items_hash;
        
    }
    
    function getStatusAllItems() {
        // Получаем статус всех предметов из базы данных
        return $this->db->getStatusAllItems();
        
    }
    
    function setBestGamers($userId, $points) {
        // Получаем старый счет пользователя по его идентификатору
        $oldScore = $this->db->getBestGamerById($userId)->score;
        
        if ($oldScore < $points) {
            // Если новый счет больше старого, то удаляем старый счет из базы данных
            $this->db->deleteBestGamerById($userId);
             // Устанавливаем новый счет для пользователя в базе данных
            return $this->db->setBestGamers($userId, $points);
           
        }
        return false;
    }
    
    function setInitialStateGamer($userId) {
        // Устанавливаем начальное состояние игрока в базе данных
        $this->db->setInitialStateGamer($userId);
        
        return true;
    }
    
    function getBestGamers() {
        // Получаем информацию о лучших игроках из базы данных
        $gamers = $this->db->getBestGamers();
        
        return $gamers;
    }
}