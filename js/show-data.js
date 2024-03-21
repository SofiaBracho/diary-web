$(function(){
    let date = document.getElementById("date");

    let title = document.getElementById("title");
    let text = document.getElementById("text");
    let action = document.getElementById("accion");
    const contenedorDatos = $('#datos');
    const formulario = document.getElementById("formulario");
    const botonDescargar = document.getElementById('descargar');
    botonDescargar.classList.add("disabled");



    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];

    entradas(1);
    cambiarFecha();

    //Cada vez que se cambia la fecha comprueba si existe la entrada y 
    //trae los datos de la bd
    date.addEventListener("change", comprobarFecha);
    comprobarFecha();

    function comprobarFecha() {
        dateFormated = new Date(date.value).toISOString().split('T')[0]; // format date

        $.ajax({
            type: 'post',
            data: {
                "accion": "comprobar",
                "date": dateFormated
            },
            url: 'inc/modelos/form.php',
            dataType: 'json',
            success: function(data) {                
                let resultado = data;
                if(resultado.respuesta == 'existe') {
                    title.value = resultado.entrada.title;
                    text.value = resultado.entrada.text;
                    date.value = resultado.entrada.date;
                    action.value = "actualizar";
                } else {
                    title.value = "";
                    text.value = "";
                    action.value = "crear";
                }
            }
        });
    }

    formulario.onsubmit = (e) => {
        e.preventDefault;
        let dateUpdated = new Date();
        dateUpdatedFormated = dateUpdated.toISOString().split('T')[0]
        
        $.ajax({
            type: 'post',
            data: {
                "title": title.value,
                "text": text.value,
                "date": dateFormated,
                "accion": action.value,
                "actualizado": dateUpdatedFormated
            },
            url: 'inc/modelos/form.php',
            dataType: 'json',
            success: function(data) {
                if(data.respuesta == 'exito') {
                    //Muestra el resultado
                    swal({
                        type: 'success',
                        title: 'Nueva entrada',
                        text: 'La entrada se creo correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    
                } else {
                    throw new Error('Ha habido un error al extraer las entradas en la base de datos');
                }
                
                cambiarFecha();
                comprobarFecha();
                if(document.querySelector(".boton.actual")) {
                    let pag = document.querySelector(".boton.actual").innerText;
                    entradas(pag);
                }
                entradas();
            }
        });
        return false;
    }


    function cambiarFecha(){
        //Tomo la fecha actual
        let fechaActual = new Date();
        let diaMes = fechaActual.getDate();
        let mes = fechaActual.getMonth()+1;
        let año = fechaActual.getFullYear();
        //Cambio la fecha por defecto del input a la actual
        date.value = `${año}-${(mes<10)?"0":""}${mes}-${(diaMes<10)?"0":""}${diaMes}`;
    }
    
    async function entradas(pag) {
        let resultado = await extraer(pag);
        await mostrar(resultado, pag);
        await opciones(pag);

        //Escribe el JSON si das click en exportar
        const botonExportar = document.querySelector("#boton-exportar");
        botonExportar.addEventListener("click", () => {
            crearJson(resultado.entradas);
        });
    }

    //Extrae de la BD las entradas
    function extraer(pag=0) {
        return new Promise(resolve => {
            //Leer las entradas de la base de datos
            $.ajax({
                type: 'get',
                url: 'inc/funciones/read.php',
                dataType: 'json',
                success: function(data) {                
                    let resultado = data;
    
                    if(resultado.respuesta == 'exito') {
                        //Retorna el resultado
                        resolve(resultado);
                    } else {
                        throw new Error('Ha habido un error al extraer las entradas en la base de datos');
                    }
                }
            });
        });

    }

    //Muestra las entradas extraidas
    function mostrar(resultado, paginaActual) {
        return new Promise(resolve => {
        
            let entries = resultado.entradas;
                let template = '';
                //Quiero tener la cantidad de elementos para hacer una paginación
                let cantidad = entries.length;
                let cantidadPorPagina = 5;
                let indice = (paginaActual-1) * cantidadPorPagina;
                let final = indice+cantidadPorPagina;
                let cantidadDePaginas = Math.ceil(cantidad/cantidadPorPagina);
                
                for (indice; indice<final; indice++) {
                    if(entries[indice]){
                        let key = entries[indice].date;
                        let entry = entries[indice];
                        let id = entry.id;
                        
                        //Formating date
                        let d = key.split("-");
                        let date = new Date(d[0], d[1]-1, d[2])
                        let diaSemana = dias[date.getDay()];
                        let diaMes = date.getDate();
                        let mes = meses[date.getMonth()];
                        let año = date.getFullYear();
                        
                        template += `
                        <li id="${id}">
                            <div class="opciones">
                                <a class="delete" id="${key}">
                                        <i class="fas fa-trash"></i>
                                </a>
                                <a class="edit" id="${key}">
                                        <i class="fas fa-edit"></i>
                                </a>
                            </div>
        
                        <div class="fecha">
                            ${diaSemana + " " + diaMes + " de " + mes + " del " + año }
                        </div>
                        
                        <br/>
                            <h2 class="titulo">${entry.title}</h2>
                        
                        <br/>
                            <div class="texto">
                        `;
                        //Separo los párrafos y los recorro todos
                        let texto = entry.text.split("\n\n");
                        texto.forEach(parrafo => {
                            template += `
                            <p>${parrafo}</p>
                            `;
                        });
                        //Cierro las etiquetas
                        template += `
                            </div>
                            </li>
                        `;
                        contenedorDatos.html(template);
    
                    }
                }
                
                //Escribe la paginación
                let paginacion = $('#paginacion');
                let botones = ``;
                for(let i=1; i<=cantidadDePaginas; i++) {
                    if(i==paginaActual) {
                        botones += `<button class="boton actual"> ${i} </button>`;
                    } else {
                        botones += `<button class="boton"> ${i} </button>`;
                    }
                }
                paginacion.html(botones);
                
                //Al hacer click en los botones de paginación
                $('.boton').click(function(){
                    entradas(this.innerHTML);
                });

                resolve();
        });

    }

    //Muestra las opciones borrar y editar entrada
    function opciones(pag) {
        return new Promise(resolve => {

// <<<<<<< HEAD
//         for (let btnEliminar of eliminar) {
//             //Al hacer click en eliminar
//             btnEliminar.onclick = ()=> {
//                 //Eliminar entrada
//                 Swal.fire({
//                     title: '¿Estás seguro?',
//                     text: "¡No podrás revertir esto!",
//                     type: 'warning',
//                     showCancelButton: true,
//                     confirmButtonColor: '#3085d6',
//                     cancelButtonColor: '#d33',
//                     confirmButtonText: '¡Si, eliminar!'
//                 }).then((result) => {
//                     if (result.value) {
// <<<<<<< HEAD
//                         //Si no estoy en la primera página y queda solo una
//                         //entrada me lleva a la anterior despues de borrarla
//                         if(pag>1 && numEntradasEnPag==1) {pag--}
// =======
// >>>>>>> master
//                         eliminarEntrada(btnEliminar.id, pag);        
//                     }
//                 })
                
//             };
//         }
// =======
            let eliminar = document.getElementsByClassName("delete");
            let editar = document.getElementsByClassName("edit");
            let numEntradasEnPag = eliminar.length;
    
            for (let btnEliminar of eliminar) {
                //Al hacer click en eliminar
                btnEliminar.onclick = ()=> {
                    //Eliminar entrada
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: "¡No podrás revertir esto!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '¡Si, eliminar!'
                    }).then((result) => {
                        if (result.value) {
                            //Si no estoy en la primera página y queda solo una
                            //entrada me lleva a la anterior despues de borrarla
                            if(pag>1 && numEntradasEnPag==1) {pag--}
                            eliminarEntrada(btnEliminar.id, pag);        
                        }
                    })
                    
                };
            }
    
            for (let btnEditar of editar) {
                //Al hacer click en editar
                btnEditar.onclick = ()=> {
                    //Cambiar fecha del input
                    editarEntrada(btnEditar);
                };
            }
// >>>>>>> v2.0.0

            resolve();
        });
    }

    function eliminarEntrada(date, pag) {
        
        $.ajax({
            type: 'post',
            data: {
                "accion": "eliminar",
                "date": date
            },
            url: 'inc/modelos/form.php',
            dataType: 'json',
            success: function(data) {                
                let resultado = data;
                if(resultado.respuesta == "exito"){
                    //Si va bien volvemos a cargar las entradas
                    Swal.fire(
                        '¡Eliminado!',
                        'La entrada ha sido borrada.',
                        'success'
                    )
                    cambiarFecha();
                    comprobarFecha();
                    entradas(pag);
                }
            }
          });
    }

    function editarEntrada(btnEditar) {
        date.value = btnEditar.id;
                let titulo = btnEditar.parentElement.parentElement.childNodes[7].innerHTML;
                let texto = btnEditar.parentElement.parentElement.childNodes[11].childNodes[1].innerHTML;
                
                //Lenamos el formulario con la entrada a editar
                action.value="actualizar";
                title.value=titulo;
                text.value=texto;

                //Animación que nos lleva hacia arriba
                $('body, html').animate({
                    scrollTop: '0px'
                }, 300);
    }

    function crearJson(data) {
        let dateUpdated = new Date(); 
        let json = {
            "metadata": {
                "application": "Mini Diary",
                "version": "2.5.6",
                "dateUpdated": dateUpdated
            },
            "entries": {}
        }
        
        data.forEach(entry => {
            let key = entry.date;
            json.entries[key] = {
                "dateUpdated": entry.dateUpdated,
                "title": entry.title,
                "text": entry.text
            }
        });
        
        json = JSON.stringify(json);
        escribirJson(json);
    }

    function escribirJson(json){
        $.ajax({
            type: 'post',
            url: 'inc/funciones/write-json.php',
            dataType: 'json',
            data: {json},
            success: function(resultado) {   

                if(resultado.respuesta == 'exito') {
                    //Alerta que fue escrito el JSON
                    swal({
                        type: 'success',
                        title: 'Exportado',
                        text: 'Se ha creado un archivo JSON con las entradas',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    const currentUrl = window.location.href;
                    botonDescargar.href = location.origin + "/diary.json";
                    botonDescargar.download = "diary.json";
                    botonDescargar.classList.remove("disabled");
                } else {
                    swal({
                        type: 'error',
                        title: 'Error!',
                        text: 'No se pudo exportar el JSON'
                    })
                }
            }
        });
    }

});