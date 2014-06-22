<?php
    header("Content-Type:text/html;charset=utf8");
    $count = file_get_contents("./add.txt");
    $count++;
    file_put_contents("./add.txt",$count);
    echo "$count";
?>