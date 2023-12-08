<?php
include_once 'Conectar.php';
class Usuarios_modelo {
        
    

    static public function get_pre_usuarios_modelo(){
        try{ 
            $consulta = Conectar::conexion()->prepare("Call preUsuarios");
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
            if(count($resultados)> 0)
                return $resultados;
            else
                return null;
        }
        catch(Exception $e){
            return null;
        }
    }
    
    static public function get_usuarios_modelo($pUsuario, $filtros) {
        try {
            $order = "";
            if(isset($filtros) && $filtros != ""){
                $filtros = explode(" ", $filtros);
                $order = "ORDER BY ".$filtros[0]." ".$filtros[1];
            }
            $consulta = Conectar::conexion()->prepare("SELECT idUsuarios as idUsuario, nombre, apellido, dni, direccion, telefono, email, fechaNac, tipoUsuario, penalidadHasta as penalidad
            FROM usuarios 
            WHERE Nombre LIKE concat('%', :pUsuario, '%') OR Apellido LIKE concat('%', :pUsuario, '%') OR DNI like concat ('%',:pUsuario, '%') ".$order);
            //$consulta = Conectar::conexion()->prepare("CALL `usuarioXparam`(:pUsuario)");
            $consulta->bindParam(":pUsuario", $pUsuario, PDO::PARAM_STR);
            $consulta->execute();

            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            $fechaActual = new DateTime();

            foreach ($resultados as &$usuario) {
                if($usuario["penalidad"]){
                    $fecha = explode(" ", $usuario["penalidad"]);
                    $usuario["penalidad"] = $fecha[0]."T".$fecha[1];
                }
            }

            if(count($resultados) > 0)
                return $resultados;
            else
                return null;

        } catch (PDOException $e) {
            return null;
        }
    }

    static public function nuevo_usuario_modelo($usuario){
        try {
            $consulta = Conectar::conexion()->prepare("INSERT INTO usuarios(nombre, apellido, dni, fechaNac, telefono, tipoUsuario, email, direccion, username, contrasenia) 
            VALUES ( '".$usuario["nombre"]."', '".$usuario["apellido"]."', ".$usuario["dni"].", '".$usuario["fechaNac"]."', ".$usuario["telefono"].", 2, '".$usuario["email"]."', '".$usuario["direccion"]."', '".$usuario["username"]."', '".$usuario["password"]."')");
            /*
            $consulta->bindParam(":pNombre", $usuario["nombre"], PDO::PARAM_STR);
            $consulta->bindParam(":pApellido", $usuario["apellido"], PDO::PARAM_STR);
            $consulta->bindParam(":pDni", $usuario["dni"], PDO::PARAM_INT);
            $consulta->bindParam(":pFechaNac", $usuario["fechaNac"], PDO::PARAM_STR);
            $consulta->bindParam(":pTelefono", $usuario["telefono"], PDO::PARAM_INT);
            $consulta->bindParam(":pEmail", $usuario["email"], PDO::PARAM_STR);
            $consulta->bindParam(":pDireccion", $usuario["direccion"], PDO::PARAM_STR);
            $consulta->bindParam(":pUserName", $usuario["username"], PDO::PARAM_STR);
            $consulta->bindParam(":pContrasenia", $usuario["password"], PDO::PARAM_STR);
            */
            $consulta->execute();
            
            return true;
        
        } catch (Exception $e) {
            return false;
        }
    }

    static public function editar_usuario_modelo($usuario){
        try {
            $consulta = Conectar::conexion()->prepare("CALL `editarUsuario`(
                :idUsuario,
                :nombre, 
                :apellido, 
                :dni, 
                :fechaNac, 
                :telefono, 
                :tipoUsuario,
                :email,
                :direccion)");
            $consulta->bindParam(":idUsuario", $usuario["idUsuario"], PDO::PARAM_INT);
            $consulta->bindParam(":nombre", $usuario["nombre"], PDO::PARAM_STR);
            $consulta->bindParam(":apellido", $usuario["apellido"], PDO::PARAM_STR);
            $consulta->bindParam(":dni", $usuario["dni"], PDO::PARAM_INT);
            $consulta->bindParam(":fechaNac", $usuario["fechaNac"], PDO::PARAM_STR);
            $consulta->bindParam(":telefono", $usuario["telefono"], PDO::PARAM_INT);
            $consulta->bindParam(":tipoUsuario", $usuario["tipoUsuario"], PDO::PARAM_INT);
            $consulta->bindParam(":email", $usuario["email"], PDO::PARAM_STR);
            $consulta->bindParam(":direccion", $usuario["direccion"], PDO::PARAM_STR);
            $consulta->execute();
            
            return true;
        
        } catch (Exception $e) {
            return false;
        }
    }

    static public function eliminar_usuario_modelo($idUsuario){
        try {
        $consulta = Conectar::conexion()->prepare(" CALL `eliminarUsuario`(:idUsuario)");
        $consulta->bindParam(":idUsuario", $idUsuario, PDO::PARAM_INT);
        $consulta->execute();
        return true;
            
        
        } 
        catch (Exception $e) {
            return false;
        }
    }
   
    static public function penalidad_modelo($idUsuario, $penalidad){

        $fechaActual = new DateTime();
        $fechaHasta = new DateTime($penalidad);
        
        if($fechaActual->diff($fechaHasta)->format('%R') == "+"){
            $fechaActual = (new DateTime())->format('Y-m-d H:i:s');
            $consulta = Conectar::conexion()->prepare("UPDATE usuarios SET penalidadDesde = '$fechaActual', penalidadHasta = :penalidad WHERE usuarios.idUsuarios = :idUsuario");
            $consulta->bindParam(":idUsuario", $idUsuario, PDO::PARAM_INT);
            $consulta->bindParam(":penalidad", $penalidad, PDO::PARAM_STR);
        }else{
            return false;
        }

        try{
            $consulta->execute();

            return true;
        }catch(Exception $e){
            return false;
        }

    }

    static public function rechazar_pre_registrado_modelo($idUsuario){
        print_r($idUsuario);
        $consulta = Conectar::conexion()->prepare("DELETE FROM usuarios WHERE idUsuarios = :idUsuario");
        $consulta->bindParam(":idUsuario", $idUsuario, PDO::PARAM_INT);
        try{
            $consulta->execute();
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    static public function aprobar_pre_registrado_modelo($idUsuario){
        $consulta = Conectar::conexion()->prepare("UPDATE usuarios SET tipoUsuario = 2 WHERE idUsuarios = :idUsuario ");
        $consulta->bindParam(":idUsuario", $idUsuario, PDO::PARAM_INT);
        try{
            $consulta->execute();
            return true;
        }catch(Exception $e){
            return false;
        }
    }

}