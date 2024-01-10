<?php

class Answer
{
    static $CODES = array(
        '1001' => 'method param not set',
        '1002' => 'method param not exists',
        '2001' => 'login or password not set',
        '2002' => 'auth user error',
        '2003' => 'all user params must be set',
        '3001' => 'room not found',
        '4001' => 'user not found',
        '9000' => 'unknown error'
    );

    static function response($data) {
        if ($data) {
            if ($data[0] === 'error') {
                $code = $data[1];
                return array(
                    'result' => 'error',
                    'error' => array(
                        'code' => $code,
                        'text' => self::$CODES[$code]
                    )
                );
            }
            return array(
                'result' => 'AAA',
                'data' => $data
            );
        }
        $code = 9000;
        return array(
            'result' => 'error',
            'error' => array(
                'code' => $code,
                'text' => self::$CODES[$code]
            )
        );
    }
}