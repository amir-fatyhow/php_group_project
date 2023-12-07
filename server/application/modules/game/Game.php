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
        return $this->db->setPersonPositionX($id, $x, $y);
    }
}