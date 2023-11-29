class PedidoController{
    constructor(){
        this.listaPedidosBM = null;
    }

    // ---------------  Metodos clase PedidoController ---------------
    cantidadPedidos(){
        if(this.listaPedidosBM)
            return this.listaPedidosBM.length;
        else
            return 0;
    }

    buscarPedidoPorid(id){
        let auxPedido;
        this.listaPedidosBM.forEach(function (l) {
            if(l.idPedido == id){
                auxPedido = l;
            }
        });
        return auxPedido;
    }

    solicitudAjaxBuscar(target, filtros, boxType){
        let datasend = {"funcion" : "search", "filtros": filtros};
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "controlador/pedidos_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let listaPedidos = JSON.parse(xhr.responseText); //el json que envía el servidor
                let listado = "";


                if(listaPedidos){
                    pedidoCtrl.listaPedidosBM = {};

                    listaPedidos.forEach(function (l) {
                        let pedidoAux = new Pedido(l.idPedido,
                            new Libro(l.idLibro, l.titulo, l.autor, l.ubicacionFisica, l.editorial, l.materia, l.lugarEdicion, l.anio, l.serie, l.observaciones),
                            new Usuario(l.idUsuario, l.nombre, l.apellido, l.dni, l.direccion, l.telefono, l.email, l.fechaNac, l.penalidad, l.tipoUsuario),
                            l.cantidad,
                            l.fechaPedido);

                        pedidoCtrl.listaPedidosBM.push(pedidoAux);

                        if(boxType == "abm")
                            listado += pedidoAux.printBoxPedidoABM();
                        else
                            listado += pedidoAux.printBoxPedidoRechazar();
                        
                    });

                    target.innerHTML = listado;

                    //Agregar eventos

                    //botonEditLibroOpen = document.querySelectorAll(".edit-libro");
                    //botonDelLibroOpen = document.querySelectorAll(".del-libro");

                    //agregarEventoLibrosEditar();
                    //agregarEventoLibrosEliminar();

                    //fin agregar eventos

                }else{
                    target.innerHTML = "<p>No se han encontrado resultados.</p>";
                }

            } else if (xhr.readyState == 4 && xhr.status != 200) {
                pedidoCtrl.listaPedidosBM = null;
                target.innerHTML = "<p>Se ha producido un error, intente nuevamente.</p>";
            }
        };
    
        xhr.send(JSON.stringify(datasend)); //Envía la info al servidor en formato string de json
    }

    solicitudAjaxABM(pedido, accion){
        let data = {"funcion" : accion, "data" : pedido};
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "controlador/pedidos_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText); //(el json de tipo {"status" : "ok"})
                
                switch(accion){
                    case "add": //profesor
                        if(response.status == "ok"){
                            modalStatusAddLibro.innerHTML = '<span class="icon-checkmark"> Libro agregado exitosamente</span>';
                            setTimeout(() => {
                                modalAddLibro.classList.remove("active");
                            }, 2000);
                        }else{
                            modalStatusAddLibro.innerHTML = '<span class="icon-blocked"> No se ha podido agregar el libro</span>';
                        }
                        break;
                    case "del": //profesor
                        if(response.status == "ok"){
                            modalStatusDelLibro.innerHTML = '<span class="icon-checkmark"> Libro eliminado exitosamente</span>';
                            busquedaLibro();
                            setTimeout(() => {
                                modalDelLibro.classList.remove("active");
                            }, 2000);
                        }else{
                            modalStatusDelLibro.innerHTML = '<span class="icon-blocked"> No se ha podido eliminar el libro</span>';
                        }
                        break;
                    case "edit": //bibliotecaria
                        if(response.status == "ok"){
                            modalStatusEditLibro.innerHTML = '<span class="icon-checkmark"> Libro editado exitosamente</span>';
                            busquedaLibro();
                            setTimeout(() => {
                                modalEditLibro.classList.remove("active");
                            }, 2000);
                        }else{
                            modalStatusEditLibro.innerHTML = '<span class="icon-blocked"> No se ha podido editar el libro</span>';
                        }
                        break;
                    case "confirm": //bibliotecaria
                        if(response.status == "ok"){
                            modalStatusDelLibro.innerHTML = '<span class="icon-checkmark"> Libro eliminado exitosamente</span>';
                            busquedaLibro();
                            setTimeout(() => {
                                modalDelLibro.classList.remove("active");
                            }, 2000);
                        }else{
                            modalStatusDelLibro.innerHTML = '<span class="icon-blocked"> No se ha podido eliminar el libro</span>';
                        }
                        break;
                    case "reject": //bibliotecaria
                        if(response.status == "ok"){
                            modalStatusDelLibro.innerHTML = '<span class="icon-checkmark"> Libro eliminado exitosamente</span>';
                            busquedaLibro();
                            setTimeout(() => {
                                modalDelLibro.classList.remove("active");
                            }, 2000);
                        }else{
                            modalStatusDelLibro.innerHTML = '<span class="icon-blocked"> No se ha podido eliminar el libro</span>';
                        }
                        break;
                }

            } else if (xhr.readyState == 4 && xhr.status != 200) {
                console.error("Error en la solicitud: " + xhr.status);
            }
        };
    
        xhr.send(JSON.stringify(data)); //Envía la info al servidor en formato string de json
    }

}

var pedidoCtrl = new PedidoController();