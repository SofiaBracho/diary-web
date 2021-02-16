$(function(){
    let formulario = document.getElementById("formulario");
    let title = document.getElementById("title");
    let text = document.getElementById("text");
    let date = document.getElementById("date");
    let accion = document.getElementById("accion");

    //Cada vez que se cambia la fecha comprueba si existe la entrada y 
    //trae los datos de la bd
    comprobarFecha();
    date.addEventListener("change", comprobarFecha);

    function comprobarFecha() {
        $.ajax({
            type: 'post',
            data: {
                "accion": "comprobar",
                "date": date.value
            },
            url: 'php/form.php',
            dataType: 'json',
            success: function(data) {                
                let resultado = data;
                if(resultado.respuesta == 'existe') {
                    title.value = resultado.entrada.title;
                    text.value = resultado.entrada.text;
                    date.value = resultado.entrada.date;
                    accion.value = "actualizar";
                } else {
                    title.value = "";
                    text.value = "";
                    accion.value = "crear";
                }
            }
        });
    }

    formulario.onsubmit = (e) => {
        e.preventDefault;
    
        let dateUpdated = new Date();

        $.ajax({
            type: 'post',
            data: {
                "title": title.value,
                "text": text.value,
                "date": date.value,
                "accion": accion.value,
                "actualizado": dateUpdated
            },
            url: 'php/form.php',
            dataType: 'json',
            success: function(data) { 
                //Recargar pagina para mostrar cambios
                window.location.href = 'index.html';
            }
        });
    }
});