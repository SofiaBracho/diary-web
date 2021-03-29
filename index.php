<?php
    include 'inc/templates/header.php';
    include 'inc/funciones/sesiones.php';
    include 'inc/funciones/pagina.php';
    session_start();
    usuario_autenticado();
?>
    <header class="contenedor header">
        <h1 class="text-gradient">Mini Diary Web</h1>
        <div class="botones">
            <a href="login.php?cerrar_sesion=true" id="boton-logout"> Cerrar Sesión </a>
            <a id="boton-subir"> Subir JSON</a>
            <a id="boton-exportar"> Exportar JSON </a>
            <a href="#" id="descargar">Descargar</a>
        </div>
    </header>
    
    <section class=contenedor>
        <form id="formulario">
            <div class="seccion-superior">
                <label for="date">
                    <i class=""></i>
                    <input type="date" name="date" id="date" >
                </label>

                <label for="title">
                    <input type="text" name="title" id="title" placeholder="Título">
                </label>
            </div>
            
            <label for="text">
                <textarea name="text" id="text" cols="30" rows="10" placeholder="Escribe aquí..."></textarea>
            </label>

            <input type="hidden" id="accion" value="crear">
            <input type="submit">
        </form>

        <ul id="datos">
            <!-- Aqui van los datos del json -->
        </ul>

        <div id="paginacion">
            <!-- Aqui van los botones de la paginacion -->
        </div>
    </section>

    <footer>
        <div class="copy text-gradient">Todos los derechos reservados ©</div>
        <div class="social text-gradient"> 
            <a href="https://minidiary.app/" target="_blank">
                <i class="fas fa-book"></i>
            </a>
            <a href="https://github.com/SofiaBracho" target="_blank"> 
                <i class="fab fa-github"></i> 
            </a>
            <!--Portafolio (cuando lo haga)-->
            <a href="#" target="_blank">
                <i class="fas fa-briefcase"></i>
            </a>
        </div>
    </footer>

<?php
    include_once "inc/templates/footer.php";
?>