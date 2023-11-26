<?php

require_once 'Conectar.php';

class LoginModelo{
    static public function login_modelo($nombre_usuario, $password){
        $consulta = Conectar::conexion()->prepare("SELECT * FROM usuarios WHERE username = :nombre_usuario AND contraseña = :contrasenia");
        $consulta->bindParam(":nombre_usuario", $nombre_usuario, PDO::PARAM_STR);
        $consulta->bindParam(':contrasenia', $password, PDO::PARAM_STR);
        $consulta->execute();
        $result = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if($result){
            $_SESSION = $result;
            if($_SESSION['tipoUsuario'] < 3){
                session_start();
                $_SESSION = $result;
            }
        }else{
            $_SESSION = array('tipoUsuario'=> -1);
        }
    }

    static public function registro_modelo($nombre_usuario, $password, $email){
        
        $consulta = Conectar::conexion()->prepare("INSERT INTO usuarios (username, contraseña, email, tipoUsuario) VALUES (:nombre_usuario, :contrasenia, :email, 4)");
        $consulta->bindParam(":nombre_usuario", $nombre_usuario, PDO::PARAM_STR);
        $consulta->bindParam(':contrasenia', $password, PDO::PARAM_STR);
        $consulta->bindParam(":email", $email, PDO::PARAM_STR);
        try{
            $consulta->execute();    
            $result = $consulta->fetch(PDO::FETCH_ASSOC);
            return true;
        }catch(Exception $e){
            return false;
        }
    }


}
?>
