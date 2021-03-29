    <script src="js/jquery-1.12.0.min.js"></script>
<?php
    //LogIn y SignIn
    echo (obtenerPaginaActual() == "login" || obtenerPaginaActual() == "crear-cuenta") 
    ? '<script src="js/sign-log-in.js"></script>' : "";

    //INDEX
    echo (obtenerPaginaActual() == "index") 
    ? '     <script src="js/scripts.js"></script>
      '
    : "";
?>
    <script src="js/sweetalert2.all.min.js"></script>
</body>
</html>