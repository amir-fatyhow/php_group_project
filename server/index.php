<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:  OPTIONS,GET,POST,PUT,DELETE");
error_reporting(-1);

require('application/App.php');

function router ($params) {
    $method = $params['method'];

    if ($method) {
        $app = new App();
        switch ($method) {
            case 'getUsers' : return $app->getUsers();
            case 'postUser' : return $app->postUser($params);
        }
    }
}

function  answer($data) {
    if ($data) {
        return array (
            'status' => '201 ok',
            'data' => $data
        );
    }
    return array('status' => '400');
}

echo json_encode(answer(router($_GET)));
