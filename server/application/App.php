<?php
require_once('modules/db/DB.php');
require_once('modules/user/User.php');
require_once('modules/chat/Chat.php');
require_once('modules/game/Game.php');

class App {
    private $db;
    private $user;
    private $chat;
    private $game;

    function __construct() {
        $this->db = new DB();
        $this->user = new User($this->db);
        $this->chat = new Chat($this->db);
        $this->game = new Game($this->db);
    }

    function getUsers() {
        return $this->user->getUsers();
    }

    function login($params) {
        $login = $params['login'];
        $hashPass = $params['hashPass'];
        $rnd = $params['rnd'];
        if ($login && $hashPass && $rnd) {
            return $this->user->login($login, $hashPass, $rnd);
        }
        return array(false, 2001);
    }

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

    function logout($params) {
        $token = $params['token'];
        if($token){
            return $this->user->logout($token);
        }
        return array(false, 4001);
    }

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

    function getPerson($params) {
        $id = $params['id'];
        return $this->game->getPerson($id);
    }

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

    function changeScore($params) {
        $points = $params['points'];
        $token = $params['token'];
        if ($points && $token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeScore($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function changeHealth($params) {
        $points = $params['points'];
        $token = $params['token'];
        if ($points && $token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeHealth($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function getItems() {
        return $this->game->getItems();
    }

    function changeChatHash($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->changeChatHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function changeGamerHash($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeGamerHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function changeItemsHash($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->changeItemsHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

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

    function getItemsHash($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getItemsHash();
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function setPersonPosition($params) {
        $token = $params['token'];
        $x = $params['x'];
        $y = $params['y'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                $this->game->updateGameHash();
                return $this->game->setPersonPosition($user->id ,$x, $y);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function setGamerStatus($params) {
        $token = $params['token'];
        $statusId = $params['statusId'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->setGamerStatus($user->id, $statusId);
            }
            return [false, 4001];
        }
        return [false, 1002];
    }

    function getScene($params) {
        $token = $params['token'];
        $gamersHash = $params['gamersHash'];
        $itemsHash = $params['itemsHash'];
        if ($token && $gamersHash && $itemsHash) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getScene($user->id, $gamersHash, $itemsHash);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function changeStatusOfItem($params) {
        $token = $params['token'];
        $isUsed = $params['isUsed'];
        $itemId = $params['itemId'];
        if ($token) {
            $user = $this->user->getUser($token);
            $item = $this->game->getItem($itemId);
            $currentStatusOfItem = $this->game->getStatusOfItem($itemId);
            if ($currentStatusOfItem->isUsed != $isUsed) {
                if ($user && $item) {
                    $this->game->updateItemsHash();
                    return $this->game->changeStatusOfItem($isUsed, $itemId);
                }
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function decreaseTiredness($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->decreaseTiredness($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function increaseTiredness($params) {
        $token = $params['token'];
        $points = $params['points'];
        echo "<script>console.log(" . $points . ");</script>";
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->increaseTiredness($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function getTiredness($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getTirednessByUserId($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function getScore($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getScoreByUserId($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function getStatusOfItem($params) {
        $token = $params['token'];
        $itemId = $params['itemId'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getStatusOfItem($itemId);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function getStatusAllItems($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getStatusAllItems();
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function setBestGamers($params) {
        $token = $params['token'];
        $points = $params['score'];
        if ($token && $points) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->setBestGamers($user->id, $points);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function setInitialStateGamer($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->setInitialStateGamer($user->id);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function getBestGamers($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getBestGamers();
            }
            return [false, 4001];
        }
        return [false, 4001];
    }

    function getGamers($params) {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->game->getGamers($token);
            }
            return [false, 4001];
        }
        return [false, 4001];
    }
}
