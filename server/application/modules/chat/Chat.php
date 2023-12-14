<?php

class Chat {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    function sendMessage($userId, $message) {
        $time = now();
        $this->db->sendMessage($userId, $message, $time);
        $hash = md5('hashMessage'.rand(0, 100000));
        $this->db->updateGameHash($hash);
        return true;
    }

    function getMessages($oldHash) {
        $game = $this->db->getHashes();
        if ($game->chat_hash === $oldHash) {
            return true;
        }
        return $this->db->getMessages();
    }

    function changeChatHash() {
        $hash = md5('hashMessage'.rand(0, 100000));
        return $this->db->updateGameHash($hash);
    }

    function getChatHash() {
        return $this->db->getHashes();
    }
}