<?php

class OnlineUsers
{
    private $connection;

    function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function getOnlineUsers($id)
    {
        $select = "SELECT * FROM onlineUsers WHERE roomId = $id";
        $result = $this->connection->query($select);

        $answer = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $answer[] = $row;
            }
        }
        return $answer;
    }
}