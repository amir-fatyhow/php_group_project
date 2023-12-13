<?php

class Game
{
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    function getPersons() {
        return $this->db->getPersons();
    }

    function choosePerson($userId, $personId) {
        return $this->db->choosePerson($userId, $personId);
    }

    function changeScore($userId, $points) {
        return $this->db->changeScore($userId, $points);
    }

    function getItems() {
        return $this->db->getItems();
    }

    function setPersonPositionX($id, $x, $y) {
        // для каждого игрока ввести свой timestamp
        // и в игре держать таймаут на частоту обновления позиции
        // если игрок обновляет свою позицию слишком часто, то игнорироватьслишком частые запросы
        $hash = md5('hashMessage'.rand(0, 100000));
        $this->db->updateGamersHash($hash);
        $this->db->setPersonPositionX($id, $x, $y);
        return true;
    }

    function setGamerStatus($userId, $statusId) {
        // проверить незанятость тренажера
        // обновить items_hash
        return $this->db->setGamerStatus($userId, $statusId);
    }

    function getGamers() {
        return $this->db->getGamers();
        // вернуть всех активных игроков вместе с их персонажами и координатами
    }

    function updateScene($timestamp, $timeout) {
        $currentTimestamp = time();
        if ($currentTimestamp - $timestamp >= $timeout) { // обновить игровую сцену
            $this->db->updateTimestamp($currentTimestamp);
            // удалить мёртвых игроков 
            
            // игрокам посчитать очки (тренит за тренажером)

            // у игроков уменьшить очки

            // если игрок умер, выставить ему статус "умер"

            // обновить хеш игроков
            $hash = md5('hashMessage'.rand(0, 100000));
            $this->db->updateGamersHash($hash);
        }
    }

    function getScene($userId, $gamersHash, $itemsHash) {
        $result = array();
        $game = $this->db->getHashes();
        $this->updateScene($game->timestamp, $game->timeout);
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
}