<?php

include_once("modelo/login_modelo.php");

class LoginControlador{


    static public function login_controlador($datos){

        $username = $datos["nombre_usuario"];
        $encriptar = md5($datos["password"]);

        $respuesta = LoginModelo::login_modelo($username, $encriptar);

    }

    static public function registro_controlador($datos){

        $username = $datos["nombre_usuario"];
        $encriptar = md5($datos["password"]);
        $email = $datos["email"];

        $respuesta = LoginModelo::registro_modelo($username, $encriptar, $email);
        if($respuesta)
            return 2;
        else
            return 0;
    }

}
?>
