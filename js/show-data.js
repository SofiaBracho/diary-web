$(function(){
    let date = document.getElementById("date");
    let title = document.getElementById("title");
    let text = document.getElementById("text");
    let action = document.getElementById("accion");
    let contenedorDatos = $('#datos');

    extraer();

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

    //Tomo la fecha actual
    let fechaActual = new Date();
    let diaMes = fechaActual.getDate();
    let mes = fechaActual.getMonth()+1;
    let año = fechaActual.getFullYear();
    //Cambio la fecha por defecto del input a la actual
    date.value = `${año}-${(mes<10)?"0":""}${mes}-${diaMes}`;

    function extraer() {
        //Leer las entradas de la base de datos
        $.ajax({
            type: 'get',
            url: 'inc/funciones/read.php',
            dataType: 'json',
            success: function(data) {                
                let resultado = data;

                if(resultado.respuesta == 'exito') {
                    // console.log("Se han extraido todas las entradas en la base de datos!");

                    //Muestra los resultados y escribe el JSON
                    crearJson(resultado.entradas);
                    opciones(resultado, 1);
                } else {
                    alert("Ha habido un error al extraer las entradas en la base de datos");                   
                }
            }
        });

    }

    function mostrar(resultado, paginaActual) {
        
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
                opciones(resultado, this.innerHTML);
            });

            return new Promise(resolve => {
                resolve("success");
            });

        //Obtener las entradas del export.json

        // $.getJSON('diary.json', function(data){
        //     let entries = data.entries;
        //     let template = '';
        //     //Quiero tener la cantidad de elementos para hacer una paginación
        //     let cantidad = Object.keys(entries).length;
        //     let cantidadPorPagina = 5;
        //     let indice = (paginaActual-1) * cantidadPorPagina;
        //     let final = indice+cantidadPorPagina;
        //     let cantidadDePaginas = Math.ceil(cantidad/cantidadPorPagina);

        //     for (indice; indice<final; indice++) {
        //         let key = Object.keys(entries)[indice];
        //         let entry = entries[key];

        //         //Formating date
        //         let d = key.split("-");
        //         let date = new Date(d[0], d[1]-1, d[2])
        //         let diaSemana = dias[date.getDay()];
        //         let diaMes = date.getDate();
        //         let mes = meses[date.getMonth()];
        //         let año = date.getFullYear();

        //         template += `
        //             <li>
        //                 <div class="fecha">${diaSemana + " " + diaMes + " de " + mes + " del " + año }</div>
        //                 <br/>
        //                 <h2 class="titulo">${entry.title}</h2>
        //                 <br/>
        //                 <div class="texto">
        //         `;
        //         //Separo los párrafos y los recorro todos
        //         let texto = entry.text.split("\n\n");
        //         texto.forEach(parrafo => {
        //             template += `
        //                     <p>${parrafo}</p>
        //             `;
        //         });
        //         //Cierro las etiquetas
        //         template += `
        //             </div>
        //             </li>
        //         `;
        //         contenedorDatos.html(template);
        //     }

        //     let paginacion = $('#paginacion');
        //     let botones = ``;
        //     for(let i=1; i<=cantidadDePaginas; i++) {
        //         if(i==paginaActual) {
        //             botones += `<button class="boton actual"> ${i} </button>`;
        //         } else {
        //             botones += `<button class="boton"> ${i} </button>`;
        //         }
        //     }
        //     paginacion.html(botones);

        //     $('.boton').click(function(){
        //         leer(this.innerHTML);
        //     });
        // });
    }

    async function opciones(resultado, numero=1) {
        //Espero que muestre todas las entradas
        let fetch = await mostrar(resultado, numero);

        let eliminar = document.getElementsByClassName("delete");
        let editar = document.getElementsByClassName("edit");

        for (let btnEliminar of eliminar) {
            btnEliminar.onclick = ()=> {
                //Eliminar entrada
                eliminarEntrada(btnEliminar.id);
            };
        }

        for (let btnEditar of editar) {
            btnEditar.onclick = ()=> {
                //Cambiar fecha del input
                editarEntrada(btnEditar);
            };
        }
    }

    function eliminarEntrada(date) {
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
                    //Si va bien
                    window.location.href = 'index.php';
                }
            }
        });
    }

    function editarEntrada(btnEditar) {
        date.value = btnEditar.id;
                let titulo = btnEditar.parentElement.parentElement.childNodes[7].innerHTML;
                let texto = btnEditar.parentElement.parentElement.childNodes[11].childNodes[1].innerHTML;
                
                action.value="actualizar";
                title.value=titulo;
                text.value=texto;

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
        escribirJson(json)
    }

    function escribirJson(json){
        $.ajax({
            type: 'post',
            url: 'inc/funciones/write-json.php',
            dataType: 'json',
            data: {json},
            success: function(data) {                
                let resultado = data;
                console.log(resultado);

                if(resultado.respuesta == 'exito') {
                } else {
                }
            }
        });
    }
    
});