<?php

    // Consultar tipo de usuario
    // Importar solo modulos necesarios

    include_once("controlador/main_controlador.php");
    include_once("controlador/login_controlador.php");

    $pagina = 0;

    if(isset($_POST["logout"])){
        session_destroy();
        $_SESSION = null;
    }

    if(isset($_POST["nombre_usuario"]) && isset($_POST["contrasenia"])){
        LoginControlador::login_controlador(array("nombre_usuario" => $_POST["nombre_usuario"], "password"=>$_POST["contrasenia"]));
    }
    
    if(isset($_POST["r-username"]) && isset($_POST["r-password"]) && isset($_POST["r-email"])){
        $pagina = LoginControlador::registro_controlador(array("nombre_usuario" => $_POST["r-username"], "password"=>$_POST["r-password"], "email"=>$_POST["r-email"]));

    }
    
    if(isset($_SESSION['tipoUsuario'])){
        switch($_SESSION['tipoUsuario']){
            case 0:
            case 1:
            case 2:
                include_once("controlador/libros_controlador.php");
                include_once("controlador/usuarios_controlador.php");
                include_once("modelo/Libros_modelo.php");
                include_once("modelo/Usuarios_modelo.php");
                $pagina = 1;
                break;
            case 4:
                $pagina = 2;
                break;
            default:
                $pagina = 0;
        }
    }

    
    $plantilla = new ControladorIndex();
    $plantilla->ctrMostrarPlantilla($pagina);


?>