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
            case 'registration' : return $app->registration($params);
            case 'login' : return $app->login($params);
            case 'logout' : return $app->logout($params);
            case 'sendMessage' : return $app->sendMessage($params);
            case 'getMessage' : return $app->getMessage();
            case 'getPersons' : return $app->getPersons();
            case 'choosePerson' : return $app->choosePerson($params);
            default : return array(false, 1002);
        }
    }
    return array(false, 1001);
}

echo json_encode(Answer::response(router($_GET)));
