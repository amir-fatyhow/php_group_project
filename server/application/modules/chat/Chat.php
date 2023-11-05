<?php

class Chat {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    function sendMessage($token, $message) {
        return $this->db->sendMessage($token, $message);
    }

    function getMessage() {
        return $this->db->getMessage();
    }
}