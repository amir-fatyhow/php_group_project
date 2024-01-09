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

    function changeHealth($userId, $points) {
        return $this->db->changeHealth($userId, $points);
    }

    function getItems() {
        return $this->db->getItems();
    }

    function getItem($id) {
        return $this->db->getItem($id);
    }

    function getGamers() {
        return $this->db->getGamers();
    }

    function setPersonPosition($id, $x, $y) {
        $user = $this->db->getGamerById($id);
        $currentTimestamp = time();
        if ($currentTimestamp - $user->timestamp >= $user->timeout) {
            $hash = md5('hashMessage'.rand(0, 100000));
            $this->db->updateGamerHash($hash);
            $this->db->setPersonPosition($id, $x, $y);
        }
        return true;
    }

    function setGamerStatus($userId, $statusId) {
        return $this->db->setGamerStatus($userId, $statusId);
    }

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
            if ($user->health <= 0) {
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
        return $this->db->getStatusOfItem($id);
    }

    function changeStatusOfItem($isUsed, $id) {
        return $this->db->changeStatusOfItem($isUsed, $id);
    }

    function updateGameHash() {
        $hash = md5('hashGame'.rand(0, 100000));
        return $this->db->updateGameHash($hash);
    }

    function updateItemsHash() {
        $hash = md5('hashItem'.rand(0, 100000));
        return $this->db->updateItemsHash($hash);
    }
}