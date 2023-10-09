<?php

class Answer
{
    function __construct()
    {
    }

    static function answer($data) {
        if ($data) {
            return array (
                'status' => '201 ok',
                'data' => $data
            );
        }
        return array('status' => '400');
    }
}