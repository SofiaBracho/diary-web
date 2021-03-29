<?php
    require_once "db.php";
    session_start();

    $data = file_get_contents($_FILES['export']['tmp_name']);
    $json = json_decode($data, true);
    $entries = $json['entries'];
 
    foreach ($entries as $key => $data) {

        try {
            //Se busca si existe la entrada
            $stmt = $conn->prepare("SELECT * FROM `entradas` WHERE `date` = ? AND id_usuario = ?;");
            $stmt->bind_param('si', $key, $_SESSION['id']);
            $stmt->execute();
            $resultado=$stmt->get_result();
            $entrada=$resultado->fetch_assoc();

            //Si no existe se inserta
            if(!isset($entrada)){
                
                $sql = " INSERT INTO `entradas` (`id`, `date`, `dateUpdated`, `title`, `text`, `id_usuario`) VALUES (NULL, ?, ?, ?, ?, ?) ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param('ssssi', $key, $data["dateUpdated"], $data["title"], $data["text"], $_SESSION["id"]);
    
                $stmt->execute();
    
                $stmt->close();
            }
            
        } catch (\Exception $e) {
            //Lanza el error
            $respuesta = [
                "respuesta" => "error",
                "error" => "Error: " . $e
            ];
        }
    }

    $respuesta = [
        "respuesta" => "exito"
    ];
    $conn->close();
    
    die( json_encode($respuesta) );

?>