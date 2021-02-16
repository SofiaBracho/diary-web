$(function(){
    let date = document.getElementById("date");
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
            url: 'php/read.php',
            dataType: 'json',
            success: function(data) {                
                let resultado = data;

                if(resultado.respuesta == 'exito') {
                    // console.log("Se han extraido todas las entradas en la base de datos!");

                    mostrar(resultado, 1);
                    crearJson(resultado.entradas);

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
                        <div class="fecha">${diaSemana + " " + diaMes + " de " + mes + " del " + año }</div>
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

        $('.boton').click(function(){
            mostrar(resultado, this.innerHTML);
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
            url: 'php/write-json.php',
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