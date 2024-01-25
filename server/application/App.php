<?php
//Подключаются файлы для работы с базой данных, пользователями, чатом и игрой
require_once('modules/db/DB.php');
require_once('modules/user/User.php');
require_once('modules/chat/Chat.php');
require_once('modules/game/Game.php');

//Объявление класса App с приватными свойствами для работы с базой данных, пользователями, чатом и игрой
class App {
    private $db;
    private $user;
    private $chat;
    private $game;

    //В конструкторе создаются экземпляры объектов для работы с базой данных, пользователями, чатом и игрой
    function __construct() {
        $this->db = new DB();
        $this->user = new User($this->db);
        $this->chat = new Chat($this->db);
        $this->game = new Game($this->db);
    }

    //Возвращает список пользователей, используя метод getUsers объекта $this->user
    function getUsers() {
        return $this->user->getUsers();
    }

    //Проверяет наличие необходимых параметров (логин, пароль, хэш) и вызывает метод login объекта $this->user
    function login($params) {
        $login = $params['login'];
        $hashPass = $params['hashPass'];
        $rnd = $params['rnd'];
        if ($login && $hashPass && $rnd) {
            return $this->user->login($login, $hashPass, $rnd);
        }
        return array(false, 2001);
    }

    //Параметры этой функции передаются в ассоциативном массиве params.
    function registration($params) {
        $login = $params['login'];
        $hashPass = $params['hashPass'];
        $name = $params['name'];
        $surname = $params['surname'];
        if($login && $name && $surname) {
            return $this->user->registration($login, $hashPass, $name, $surname);
        }
        return array(false, 2003);
    }

    //Если token имеет значение, вызывается метод logout объекта user с передачей token в качестве параметра. Возвращается результат этого вызова.
    function logout($params) {
        $token = $params['token'];
        if($token){
            return $this->user->logout($token);
        }
        return array(false, 4001);
    }

    //Если token и message имеют значения, вызывается метод getUser объекта user с передачей token в качестве параметра.
    //Если пользователь существует, вызывается метод sendMessage объекта chat с передачей user->id и message в качестве параметров. Возвращается результат этого вызова.
    function sendMessage($params) {
        $token = $params['token'];
        $message = $params['message'];
        if ($token && $message) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->sendMessage($user->id, $message);
            }
            return array(false, 9000);
        }
        return array(false, 4001);
    }

    // Если token и hash имеют значения, вызывается метод getUser объекта user с передачей token в качестве параметра.
    //Если пользователь существует, вызывается метод getMessages объекта chat с передачей hash в качестве параметра. Возвращается результат этого вызова.
    function getMessage($params) {
        $token = $params['token'];
        $hash = $params['hash'];

        if ($token && $hash) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->getMessages($hash);
            }
        }
        return [false, 9000];
    }

    //Функция getPersons возвращает результат вызова метода getPersons объекта game.
    function getPersons() {
        return $this->game->getPersons();
    }

    //Если token и personId имеют значения, вызывается метод getUser объекта user с передачей token в качестве параметра.
    //Если пользователь существует, вызывается метод choosePerson объекта game с передачей user->id и personId в качестве параметров. Возвращается результат этого вызова
    function chooseSkin($params) {
        $token = $params['token'];
        $skinId = $params['skinId'];
        if ($token && $skinId) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->chooseSkin($user->id, $skinId);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function setSkin($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->setSkin($user->id);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Функция принимает массив параметров $params
    function changeScore($params) {
        //Получаем значения $points и $token из массива $params
        $points = $params['points'];
        $token = $params['token'];
        //Получаем пользователя по токену, используя метод getUser из объекта $this->user
        if ($points && $token) {
            $user = $this->user->getUser($token);
            //Вызываем метод changeScore из объекта $this->game, передавая идентификатор пользователя и количество очков
            if ($user) {
                return $this->game->changeScore($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function changeTiredness($params) {
        $points = $params['points'];
        $token = $params['token'];
        //Вызываем метод changeHealth из объекта $this->game, передавая идентификатор пользователя и количество очков здоровья
        if ($points && $token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeTiredness($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Функция просто вызывает метод getItems из объекта $this->game и возвращает его результат
    function getItems() {
        return $this->game->getItems();
    }

    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function changeChatHash($params) {
        $token = $params['token'];
        if ($token) {
            //Вызываем метод changeChatHash из объекта $this->chat
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->changeChatHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }
    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function changeGamerHash($params) {
        $token = $params['token'];
        if ($token) {
            //Вызываем метод changeGamerHash из объекта $this->game
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeGamerHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function changeItemsHash($params) {
        $token = $params['token'];
        if ($token) {
            //Вызываем метод changeItemsHash из объекта $this->game
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeItemsHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function getChatHash($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->getChatHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }
    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function getItemsHash($params) {
        $token = $params['token'];
        //Вызываем метод getItemsHash из объекта $this->game
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getItemsHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function setPersonPosition($params) {
        $token = $params['token'];
        $x = $params['x'];
        $y = $params['y'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                //Вызываем метод updateGameHash из объекта $this->game
                $this->game->updateGameHash();
                //Вызываем метод setPersonPosition из объекта $this->game, передавая идентификатор пользователя
                return $this->game->setPersonPosition($user->id ,$x, $y);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function setGamerStatus($params) {
        $token = $params['token'];
        $statusId = $params['statusId'];
        if ($token) {
            //Вызываем метод setGamerStatus из объекта $this->game, передавая идентификатор пользователя и $statusId
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->setGamerStatus($user->id, $statusId);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    //Получаем пользователя по токену, используя метод getUser из объекта $this->user
    function getScene($params) {
        $token = $params['token'];
        $gamersHash = $params['gamersHash'];
        $itemsHash = $params['itemsHash'];
        //Вызываем метод getScene из объекта $this->game, передавая идентификатор пользователя, $gamersHash и $itemsHash
        if ($token && $gamersHash && $itemsHash) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getScene($user->id, $gamersHash, $itemsHash);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция изменяет статус предмета
    function changeStatusOfItem($params) {
        $token = $params['token'];
        $isUsed = $params['isUsed'];
        $itemId = $params['itemId'];
        // Если токен существует
        if ($token) {
            $user = $this->user->getUser($token);
            $item = $this->game->getItem($itemId);
            $currentStatusOfItem = $this->game->getStatusOfItem($itemId);
            // Если текущий статус предмета отличается от запрошенного статуса
            if ($currentStatusOfItem->isUsed != $isUsed) {
                if ($user && $item) {
                    $this->game->updateItemsHash();
                    // Изменяем статус предмета и возвращаем результат
                    return $this->game->changeStatusOfItem($isUsed, $itemId);
                }
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция уменьшает усталость пользователя
    function decreaseTiredness($params) {
        $token = $params['token'];
        // Если токен существует
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                // Уменьшаем усталость пользователя и возвращаем результат
                return $this->game->decreaseTiredness($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция увеличивает усталость пользователя
    function increaseTiredness($params) {
        $token = $params['token'];
        $points = $params['points'];
        if ($token) {
            // Получаем пользователя по токену
            $user = $this->user->getUser($token);
            if ($user) {
                // Увеличиваем усталость пользователя на заданное количество очков и возвращаем результат
                return $this->game->increaseTiredness($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция получает значение усталости пользователя
    function getTiredness($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                // Получаем значение усталости пользователя и возвращаем результат
                return $this->game->getTirednessByUserId($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция getScore принимает параметры и возвращает счет пользователя по его идентификатору
    function getScore($params) {
        $token = $params['token'];
        if ($token) {
            // Если пользоватль найден, возвращается его счет. Если пользователя не найдено, возвращается ошибка с кодом 4001.
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getScoreByUserId($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция getStatusOfItem принимает параметры, включая токен и идентификатор предмета.
    function getStatusOfItem($params) {
        $token = $params['token'];
        $itemId = $params['itemId'];
        if ($token) {
            // Если пользователь найден, возвращается состояние предмета. Если пользователя не найдено, возвращается ошибка с кодом 4001.
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getStatusOfItem($itemId);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция getStatusAllItems принимает параметры и возвращает состояние всех предметов.
    function getStatusAllItems($params) {
        $token = $params['token'];
        if ($token) {
            // Если пользователь найден, возвращается состояние всех предметов. Если пользователя не найдено, возвращается ошибка с кодом 4001.
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getStatusAllItems();
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция setBestGamers принимает параметры, включая токен и количество очков.
    function setBestGamers($params) {
        $token = $params['token'];
        $points = $params['score'];
        if ($token && $points) {
            // Если пользователь найден, его лучшие игроки обновляются в соответствии с переданными параметрами. Если пользователя не найдено, возвращается ошибка с кодом 4001.
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->setBestGamers($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция setInitialStateGamer принимает параметры, включая токен.
    function setInitialStateGamer($params) {
        $token = $params['token'];
        if ($token) {
            // Если пользователь найден, его начальное состояние игрока обновляется. Если пользователя не найдено, возвращается ошибка с кодом 4001.
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->setInitialStateGamer($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция getBestGamers принимает параметры и возвращает лучших игроков.
    function getBestGamers($params) {
        $token = $params['token'];
        if ($token) {
            // Если пользователь найден, возвращается список лучших игроков. Если пользователя не найдено, возвращается ошибка с кодом 4001.
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getBestGamers();
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    // Функция getGamers принимает параметры и возвращает всех игроков.
    function getGamers($params) {
        $token = $params['token'];
        if ($token) {
            // Если пользователь найден, вызывается метод getGamers объекта game, передавая ему токен пользователя.
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getGamers($token);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }
}
