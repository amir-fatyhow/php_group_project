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
        $this->db->choosePerson($userId, $personId);
        return true;
    }

    function changeScore($userId, $points) {
        $currentScore = $this->db->getScoreByUserId($userId)->score;
        $score = $currentScore + $points;
        return $this->db->changeScore($userId, $score);
    }

    function changeTiredness($userId, $points) {
        return $this->db->changeTiredness($userId, $points);
    }

    function getItems() {
        return $this->db->getItems();
    }

    function getItem($id) {
        return $this->db->getItem($id);
    }

    function getGamers($token) {
        return $this->db->getGamers($token);
    }

    function setPersonPosition($id, $x, $y) {
        $user = $this->db->getGamerById($id);
        $currentTimestamp = time();
        if ($currentTimestamp - $user->timestamp >= $user->timeout) {
            $hash = md5('gamerHash'.rand(0, 100000));
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
        return $this->db->getStatusOfItem($id)->isUsed;
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

    function decreaseTiredness($userId) {
        $currentTiredness = $this->db->getTirednessByUserId($userId)->tiredness;
        if ($currentTiredness > 10) {
            $tiredness = $currentTiredness - 10;
            return $this->db->decreaseTirednessByUserId($userId, $tiredness);
        } else {
            return $this->db->decreaseTirednessByUserId($userId, 1);
        }
    }

    function increaseTiredness($userId, $points) {
        $currentTiredness = $this->db->getTirednessByUserId($userId)->tiredness;
        $tiredness = $currentTiredness + $points;
        return $this->db->increaseTirednessByUserId($userId, $tiredness);
    }

    function getTirednessByUserId($userId) {
        return $this->db->getTirednessByUserId($userId)->tiredness;
    }

    function getScoreByUserId($userId) {
        return $this->db->getScoreByUserId($userId)->score;
    }

    function changeGamerHash() {
        $hash = md5('changeGamerHash'.rand(0, 100000));
        return $this->db->updateGamerHash($hash);
    }

    function changeItemsHash() {
        $hash = md5('changeItemsHash'.rand(0, 100000));
        return $this->db->updateItemsHash($hash);
    }

    function getItemsHash() {
        return $this->db->getHashes()->items_hash;
    }

    function getStatusAllItems() {
        return $this->db->getStatusAllItems();
    }

    function setBestGamers($userId, $points) {
        $oldScore = $this->db->getBestGamerById($userId)->score;
        if ($oldScore < $points) {
            $this->db->deleteBestGamerById($userId);
            return $this->db->setBestGamers($userId, $points);
        }
        return false;
    }

    function setInitialStateGamer($userId) {
        $this->db->setInitialStateGamer($userId);
        return true;
    }

    function getBestGamers() {
        $gamers = $this->db->getBestGamers();
        return $gamers;
    }
}