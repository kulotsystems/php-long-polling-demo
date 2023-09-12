<?php

class Score
{
    protected $db_con;
    protected $table;


    public function __construct()
    {
        $this->db_con = $GLOBALS['DB_CON'];
        $this->table   = 'scores';
    }


    public function getScore()
    {
        $stmt = $this->db_con->prepare("SELECT `id`, `home`, `away`, UNIX_TIMESTAMP(`created_at`) AS `timestamp` FROM $this->table ORDER BY `timestamp` DESC LIMIT 1");
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return false;
    }

}
