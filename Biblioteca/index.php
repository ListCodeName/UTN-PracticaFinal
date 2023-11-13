<!DOCTYPE html>
<html lang="es">
<head>
    
    <?php
    include_once(__DIR__."/controlador/index.php");
    include_once(__DIR__."/controlador/libros_controlador.php");
    include_once(__DIR__."/controlador/usuarios_controlador.php");
    include_once(__DIR__."/modelo/Libros_modelo.php");
    include_once(__DIR__."/modelo/Usuarios_modelo.php");
    
    $plantilla = new ControladorIndex();
    $plantilla->ctrMostrarPlantilla();
    ?>

    <!-- Scripts -->
    
    
    
    
</head>
<body>
   
</body>
</html>




