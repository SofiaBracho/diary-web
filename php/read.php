<?php
    require_once "db.php";

    try {
        //Se leen todas las entradas en la tabla
        $sql = " SELECT * FROM `entradas` ";
        $stmt = $conn->query($sql);

        $entradas = array();
        while ( $entrada = $stmt->fetch_assoc() ) {
            $entradas[] = $entrada;
        }

        $respuesta = [
            "respuesta" => "exito",
            "entradas" => $entradas
        ];
    } catch (\Exception $e) {
        //Lanza el error
        $respuesta = [
            "respuesta" => "error",
            "error" => "Error: " . $e
        ];
    }
    
    $conn->close();

    die( json_encode($respuesta) );