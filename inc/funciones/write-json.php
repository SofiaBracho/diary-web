<?php
    $json = $_POST["json"];

    $file = fopen("../../diary.json", "w");

    fwrite($file, $json);

    fclose($file);

    if(error_get_last()) {
        $respuesta = error_get_last();
    } else {
        $respuesta = array("respuesta" => "exito");
    }

    die(json_encode($respuesta));