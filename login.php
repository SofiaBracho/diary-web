<?php
    session_start();
    include 'inc/templates/header.php';
    include 'inc/funciones/pagina.php';

    if(isset($_GET['cerrar_sesion'])) {
        $_SESSION = array();
    }

    if(isset($_SESSION['id'])) {
        header('Location:index.php');
        exit();
    }
?>
    <div class="contenedor-formulario">
        <h1>Mini Diary</h1>
        <form id="formulario" class="caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton-formulario" value="Iniciar Sesión">
            </div>

            <div class="campo">
                <a href="crear-cuenta.php">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>

<?php
    include 'inc/templates/footer.php';
?>