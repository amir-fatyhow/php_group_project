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

            // http://server/?method=registration&login=&name=&surname=&hash=&hashS=
            case 'registration' : return $app->registration($params);

            // http://server/?method=login&login=&pass=&hashS=
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

            // http://server/?method=decreaseHealth&points=&token=
            //case 'decreaseHealth' : return $app->changeHealth($params);

            // http://server/?method=getItems
            case 'getItems' : return $app->getItems();

            // http://server/?method=changeChatHash&token=
            case 'changeChatHash' : return $app->changeChatHash($params);

            // http://server/?method=changeGamerHash&token=
            case 'changeGamerHash' : return $app->changeGamerHash($params);

            // http://server/?method=changeItemsHash&token=
            case 'changeItemsHash' : return $app->changeItemsHash($params);

            // http://server/?method=getChatHash&token=
            case 'getChatHash': return $app->getChatHash($params);

            // http://server/?method=getItemsHash&token=
            case 'getItemsHash': return $app->getItemsHash($params);

            // http://server/?method=setPersonPosition&token=&x=&y=
            case 'setPersonPosition': return $app->setPersonPosition($params);

            // http://server/?method=setGamerStatus&token=&statusId=
            case 'setGamerStatus': return $app->setGamerStatus($params);

            // http://server/?method=getScene&token=&gamersHash=&itemsHash=
            case 'getScene': return $app->getScene($params);

            // http://server/?method=changeStatusOfItem&token=&itemId=&isUsed=
            case 'changeStatusOfItem' : return $app->changeStatusOfItem($params);

            // http://server/?method=decreaseTiredness&token=
            case 'decreaseTiredness' : return $app->decreaseTiredness($params);

            // http://server/?method=increaseTiredness&token=&points=
            case 'increaseTiredness' : return $app->increaseTiredness($params);

            // http://server/?method=getTiredness&token=
            case 'getTiredness' : return $app->getTiredness($params);

            // http://server/?method=getScore&token=
            case 'getScore' : return $app->getScore($params);

            default : return array(false, 1002);
        }
    }
    return array(false, 1001);
}

echo json_encode(Answer::response(router($_GET)));
