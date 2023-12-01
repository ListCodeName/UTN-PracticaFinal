// ****************************************************************************
//  Elementos de la vista Pedidos (Libros) (GLOBALES)
// ****************************************************************************

var filtrosPedidosLibro = document.querySelector(".filtro-libro-pedido");
var gridPedidosLibro = document.querySelector(".add-libros-pedidos");

var botonesConfirmPedidosLibro = document.querySelectorAll(".confirm-libro-pedido");
var botonesEditPedidosLibro = document.querySelectorAll(".edit-libro-pedido");
var botonesRejectPedidosLibro = document.querySelectorAll(".reject-libro-pedido");

var modalLibroPedido = document.querySelector(".modal-edit-libro-pedido");
var botonCloseModalEditPedido = document.querySelector(".close-modal-edit-libro-pedido");
var botonCancelModalEditPedido = document.querySelector(".cancel-modal-edit-libro-pedido");
var statusEditPedidoLibro = document.querySelector(".db-edit-libro-pedido");
var botonSendPedidoLibro = document.querySelector(".confirm-modal-edit-libro-pedido");

var inputEditPedidoTitulo = document.querySelector(".solicitud-edit.titulo");
var inputEditPedidoAutor = document.querySelector(".solicitud-edit.autor");
var inputEditPedidoEditorial = document.querySelector(".solicitud-edit.editorial");
var inputEditPedidoMateria = document.querySelector(".solicitud-edit.materia");
var inputEditPedidoOrigen = document.querySelector(".solicitud-edit.origen");
var inputEditPedidoAnio = document.querySelector(".solicitud-edit.anio");
var inputEditPedidoEdicion = document.querySelector(".solicitud-edit.edicion");
var inputEditPedidoCantidad = document.querySelector(".solicitud-edit.cantidad");
var inputEditPedidoObservacion = document.querySelector(".solicitud-edit.observacion");


// ****************************************************************************
//                                Fin Elementos 
// ****************************************************************************




// *****************************************************************
//                      Eventos de pedidos (Libros)
// *****************************************************************

// ------------------------ Metodo Buscar ----------------------------

function buscarPedidosProfesor(){
    pedidoCtrl.solicitudAjaxBuscar(gridPedidosLibro, filtrosPedidosLibro.value, "abm");
}

filtrosPedidosLibro.addEventListener("change", ()=>{
    buscarPedidosProfesor();
});

// ------------------------ Metodo Editar -----------------------------

botonCancelModalEditPedido.addEventListener("click", ()=>{
    modalLibroPedido.classList.remove('active');
});

botonCloseModalEditPedido.addEventListener("click", ()=>{
    modalLibroPedido.classList.remove('active');
});

function agregarEventosEditarPedido(){
    for (let i = 0; i < botonesEditPedidosLibro.length ; i++) {
        
        botonesEditPedidosLibro[i].addEventListener("click",()=>{
            let idPedido = botonesEditPedidosLibro[i].getAttribute("idPedido");
            let objPedido = pedidoCtrl.buscarLibroPorid(idPedido);
            statusEditPedidoLibro.innerHTML = "";

            inputEditPedidoTitulo.value = objPedido.libro.titulo;
            inputEditPedidoAutor.value = objPedido.libro.autor;
            inputEditPedidoEditorial.value = objPedido.libro.editorial;
            inputEditPedidoMateria.value = objPedido.libro.materia;
            inputEditPedidoOrigen.value = objPedido.libro.lugarEdicion;
            inputEditPedidoAnio.value = objPedido.libro.anio;
            inputEditPedidoEdicion.value = objPedido.libro.serie;
            inputEditPedidoCantidad.value = objPedido.cantidad;
            inputEditPedidoObservacion.value = objPedido.libro.observaciones;

            modalEditLibro.setAttribute("idLibroTemp", idLibro);
    
            modalEditLibro.classList.add('active');
        });
    }
}

modalEditBotonSend.addEventListener("click", ()=>{

    if(campoTituloEdit.value != "" &&
        campoAutorEdit.value != "" &&
        campoUbicacionEdit.value != "" &&
        campoEditorialEdit.value != "" &&
        campoMateriaEdit.value != "" &&
        campoOrigenEdit.value != "" &&
        campoAnioEdit.value != "" &&
        campoEdicionEdit.value != "" &&
        campoObservacionEdit.value){

        let libro = new Libro(modalEditLibro.getAttribute("idLibroTemp"),
            campoTituloEdit.value,
            campoAutorEdit.value,
            campoUbicacionEdit.value,
            campoEditorialEdit.value,
            campoMateriaEdit.value,
            campoOrigenEdit.value,
            campoAnioEdit.value,
            campoEdicionEdit.value,
            campoObservacionEdit.value);
    
        libroCtrl.solicitudAjaxABM(libro.toJson(),"edit");
    }else{
        modalStatusEditLibro.innerHTML = "<span class='icon-warning'>Por favor complete los campos antes de enviar.</span>";
    }

});



// ------------------------ Metodos agregar ----------------------------
modalSolicitarLibroClose.addEventListener("click", ()=>{
    modalSolicitarLibro.classList.remove('active');
});

modalSolicitarLibroCancel.addEventListener("click", ()=>{
    modalSolicitarLibro.classList.remove('active');
});

botonAddPedido.addEventListener("click",()=>{
    modalSolicitarLibro.classList.add('active');
});

botonSendSolicitarLibro.addEventListener("click", ()=>{
    if(inputAddSolicitudTitulo != "" && inputAddSolicitudAutor != "" && inputAddSolicitudEditorial != "" &&
        inputAddSolicitudMateria != "" && inputAddSolicitudOrigen != "" && inputAddSolicitudAnio != "" &&
        inputAddSolicitudEdicion != "" && inputAddSolicitudCantidad != "" && inputAddSolicitudObservacion){

        let pedidoAux = new Pedido(null,
            new Libro(null, 
                inputAddSolicitudTitulo.value, 
                inputAddSolicitudAutor.value,
                null, 
                inputAddSolicitudEditorial.value, 
                inputAddSolicitudMateria.value, 
                inputAddSolicitudOrigen.value, 
                inputAddSolicitudAnio.value, 
                inputAddSolicitudEdicion.value, 
                inputAddSolicitudObservacion.value),
            null, // <---- Los datos del usuario vienen de la variable $_SESSION
            inputAddSolicitudCantidad.value,
            null);

        pedidoCtrl.solicitudAjaxABM(pedidoAux.toJson(), "add");
    }else{
        alert("Hay campos sin llenar todavía");
    }
});


// ---------------------------- Metodos Cancelar ----------------------------------

function agregarEventosEliminarPedido(){
    for (let i = 0; i < botonesDelPedido.length ; i++) {
        botonesDelPedido[i].addEventListener("click",()=>{
            let idPedido = botonesDelPedido[i].getAttribute("idPedido");
            pedidoCtrl.solicitudAjaxABM({"idPedido": idPedido}, "del");
        });
    }
}


// *****************************************************************
//                                Fin Eventos
// *****************************************************************

