<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:  OPTIONS,GET,POST,PUT,DELETE");
error_reporting(-1);

require('application/App.php');
require('./Answer.php');

function router ($params) {
    $method = $params['method'];

    if ($method) {
        $app = new App();
        switch ($method) {
            case 'getUsers' : return $app->getUsers();
            case 'postUser' : return $app->postUser($params);
            case 'getOnlineUsers' : return $app->getOnlineUsers($params);
        }
    }
}

echo json_encode(Answer::answer(router($_GET)));
