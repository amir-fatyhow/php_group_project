<?php

class Chat {
    // Приватное свойство db, которое содержит объект базы данных 
    private $db; 
    // Конструктор класса, принимающий объект базы данных и сохраняющий его в свойство db 
    function __construct($db) {
        $this->db = $db;
    }

    // Функция для отправки сообщения, принимающая идентификатор пользователя и сообщение
    function sendMessage($userId, $message) {
        // Вызываем функцию sendMessage из объекта базы данных и передаем ей идентификатор пользователя и сообщение 
        $this->db->sendMessage($userId, $message);
        // Создаем хэш-строку с помощью функции md5 и случайного числа 
        $hash = md5('hashMessage'.rand(0, 100000));
        // Вызываем функцию updateChatHash из объекта базы данных и передаем ей созданную хэш-строку
        $this->db->updateChatHash($hash);
        return true;
    }
    
    // Функция для получения сообщений, принимающая предыдущий хэш-строку 
    function getMessages($oldHash) {
        // Получаем объект хэш-строки из базы данных
        $game = $this->db->getHashes();
        // Проверяем, совпадает ли хэш-строка из базы данных с предыдущей хэш-строкой 
        if ($game->chat_hash === $oldHash) {
            return true;
        }
        return $this->db->getMessages();
    }

    // Функция для изменения хэш-строки чата 
    function changeChatHash() {
        // Создаем новую хэш-строку с помощью функции md5 и случайного числа 
        $hash = md5('hashMessage'.rand(0, 100000));
        // Вызываем функцию updateChatHash из объекта базы данных и передаем ей новую хэш-строку 
        return $this->db->updateChatHash($hash);
    }
    // Функция для получения текущей хэш-строки чата 
    function getChatHash() {
        // Получаем объект хэш-строки из базы данных и возвращаем его 
        return $this->db->getHashes();
    }
}