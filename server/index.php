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
            // http://server/?method=getUsers
            case 'getUsers' : return $app->getUsers();

            // http://server/?method=registration&login=sheet&name=piece&surname=of&hash=c4ca4238a0b923820dcc509a6f75849b
            case 'registration' : return $app->registration($params);

            // http://server/?method=login&login=bobr&pass=c4ca4238a0b923820dcc509a6f75849b
            case 'login' : return $app->login($params);

            // http://server/?method=logout&token=
            case 'logout' : return $app->logout($params);

            // http://server/?method=sendMessage&token=&message=
            case 'sendMessage' : return $app->sendMessage($params);

            // http://server/?method=getMessages&token=&hash=
            case 'getMessages' : return $app->getMessage($params);

            // http://server/?method=getPersons
            case 'getPersons' : return $app->getPersons();

            // http://server/?method=choosePerson&token=&personId=1
            case 'choosePerson' : return $app->choosePerson($params);

            // http://server/?method=increaseScore&points=&token=
            case 'increaseScore' : return $app->changeScore($params);

            // http://server/?method=getItems
            case 'getItems' : return $app->getItems();

            default : return array(false, 1002);
        }
    }
    return array(false, 1001);
}

echo json_encode(Answer::response(router($_GET)));
