<?php
const DB_HOST = 'localhost';
const DB_NAME = 'php-long-polling-demo';
const DB_USER = 'root';
const DB_PASS = '';

$DB_CON = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if($DB_CON->connect_error) {
    die(json_encode([
        'error' => $DB_CON->connect_error
    ]));
}