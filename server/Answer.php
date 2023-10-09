<?php

class Answer
{
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