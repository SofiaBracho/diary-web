<?php
    session_start();
    include 'inc/templates/header.php';
    include 'inc/funciones/pagina.php';

    if(isset($_SESSION['nombre'])) {
        header('Location:index.php');
        exit();
    }
?>

    <div class="contenedor-formulario">
        <h1>Mini Diary<span>Crear Cuenta</span></h1>
        <form id="formulario" class=" caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="crear">
                <input type="submit" class="boton-formulario" value="Crear cuenta">
            </div>
            <div class="campo">
                <a href="login.php">Inicia Sesión Aquí</a>
            </div>
        </form>
    </div>

<?php
    include 'inc/templates/footer.php';
?>