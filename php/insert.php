<?php
    require_once "db.php";

    foreach ($_POST as $key => $data) {

        try {
            //Se insertan todas las entradas en la tabla
            $sql = " INSERT INTO `entradas` (`id`, `date`, `dateUpdated`, `title`, `text`) VALUES (NULL, ?, ?, ?, ?) ";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssss', $key, $data["dateUpdated"], $data["title"], $data["text"]);

            $stmt->execute();

            $respuesta = [
                "respuesta" => "exito"
            ];
            $stmt->close();
        } catch (\Exception $e) {
            //Lanza el error
            $respuesta = [
                "respuesta" => "error",
                "error" => "Error: " . $e
            ];
        }
    }
    $conn->close();
    
    die( json_encode($respuesta) );
?>