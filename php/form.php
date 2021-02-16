<?php
    require_once "db.php";
    
    if(isset($_POST["accion"])) {

        if($_POST["accion"] == "comprobar"){
            //Comprueba si existe la entrada en la bd
            try {
                $date = $_POST["date"];
        
                $sql = " SELECT * FROM `entradas` WHERE `date` = ? ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $date);
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
                $sql = "INSERT INTO `entradas`(`id`, `date`, `dateUpdated`, `title`, `text`) 
                        VALUES (NULL, ?, ?, ?, ?) ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssss", $date, $dateUpdated, $title, $text);
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
                $sql = "UPDATE `entradas` SET `dateUpdated`=?,`title`=?,`text`=? WHERE `date`=? ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssss", $dateUpdated, $title, $text, $date);
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