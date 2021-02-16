<?php
    $json = $_POST["json"];

    $file = fopen("../diary.json", "w");

    fwrite($file, $json);

    fclose($file);