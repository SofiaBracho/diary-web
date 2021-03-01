$(function(){

    //Al apretar el botón de subir lee el archivo en el directorio raíz y
    //sube las entradas a la base de datos
    let boton = document.getElementById("boton-subir");

    boton.addEventListener("click", () => {
        
        $.getJSON('diary.json', function(data){
            let entries = data.entries;
    
            uploadEntries(entries);
        });
    
        //Esta función sube todas las entradas del export.json a la base de 
        //datos
        function uploadEntries(datos) {
            
            $.ajax({
                type: 'post',
                data: datos,
                url: 'inc/funciones/insert.php',
                dataType: 'json',
                success: function(data) {
                    let resultado = data;
                   console.log(resultado)
                    if(resultado.respuesta == 'exito') {
                        console.log("Se han insertado todas las entradas en la base de datos!");
                    } else {
                        console.log("Ha habido un error al insertar las entradas en la base de datos");                   
                    }
                }
            });
        }
    })

    
        
    
    
});