<?php
    require_once "../funciones/db.php";
    session_start();
    
    if(isset($_POST["accion"])) {

        if($_POST["accion"] == "comprobar"){
            //Comprueba si existe la entrada en la bd
            try {
                $date = $_POST["date"];
        
                $sql = " SELECT * FROM `entradas` WHERE `date` = ? AND `id_usuario` = ? ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("si", $date, $_SESSION["id"]);
                $stmt->execute();
        
                $entrada = $stmt->get_result();
                $entrada = $entrada->fetch_assoc();
        
                //Si existe devuelve los datos
                if($entrada){
                    $respuesta = [
                        "respuesta" => "existe",
                        "entrada" => $entrada
                    ];
                } else {
                    $respuesta = [
                        "respuesta" => "no existe"
                    ];
                }
        
                $stmt->close();
                $conn->close();        
            } catch (\Exception $e) {
                //Lanza el error
                $respuesta = [
                    "respuesta" => "no existe",
                    "error" => "Error: " . $e
                ];
            }
        
        }

        //Para crear una nueva entrada
        if($_POST["accion"] == "crear") {
            $date = $_POST["date"];
            $dateUpdated = $_POST["actualizado"];
            $title = $_POST["title"];
            $text = $_POST["text"];
    
            try {
                $sql = "INSERT INTO `entradas`(`id`, `date`, `dateUpdated`, `title`, `text`, `id_usuario`) 
                        VALUES (NULL, ?, ?, ?, ?, ?) ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssi", $date, $dateUpdated, $title, $text, $_SESSION["id"]);
                $stmt->execute();
    
                $respuesta = [
                    "respuesta" => "exito"
                ];
            } catch (\Exception $e) {
                $respuesta = [
                    "respuesta" => "Error: " . $e
                ];
            }
        }
    
        //Para modificar una entrada existente
        if($_POST["accion"] == "actualizar") {
            $date = $_POST["date"];
            $dateUpdated = $_POST["actualizado"];
            $title = $_POST["title"];
            $text = $_POST["text"];
    
            try {
                $sql = "UPDATE `entradas` SET `dateUpdated`=?,`title`=?,`text`=? WHERE `date`= ? AND `id_usuario` = ? ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssi", $dateUpdated, $title, $text, $date, $_SESSION["id"]);
                $stmt->execute();
    
                $respuesta = [
                    "respuesta" => "exito"
                ];
            } catch (\Exception $e) {
                $respuesta = [
                    "respuesta" => "Error: " . $e
                ];
            }        
        }

        //Para eliminar entradas
        if($_POST["accion"] == "eliminar") {
            $date = $_POST["date"];
    
            try {
                $sql = " DELETE FROM `entradas` WHERE `date`= ? AND `id_usuario` = ? ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("si", $date, $_SESSION["id"]);
                $stmt->execute();
    
                $respuesta = [
                    "respuesta" => "exito"
                ];
            } catch (\Exception $e) {
                $respuesta = [
                    "respuesta" => "Error: " . $e
                ];
            }        
        }
        
    }
    

    die( json_encode($respuesta) );