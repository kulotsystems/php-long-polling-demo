<?php

require_once '../config/database.php';
require_once 'models/Score.php';

$score = new Score();

// check for last timestamp
if(isset($_POST['last'])) {
    // process sent last timestamp
    $last_timestamp = intval($_POST['last']);

    // set 30 seconds time limit
    set_time_limit(30);

    // stop when long polling breaks
    ignore_user_abort(false);

    // infinite loop to check for updates
    while(true) {
        $score  = new Score();
        $latest_score = $score->getScore();
        if($latest_score['timestamp'] > $last_timestamp) {
            echo json_encode($latest_score);
            break;
        }

        // sleep for 1second to prevent flooding the server
        sleep(1);
    }
}