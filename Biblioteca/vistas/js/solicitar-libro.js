// ****************************************************************************
//  Elementos de la vista Solicitar (Profesor) (GLOBALES)
// ****************************************************************************

var gridSolicitudesProfesor = document.querySelector(".add-libros-pedidos");
var filtrosSolicitudesProfesor = document.querySelector("filtros-pedidos-profesor");
var botonAddPedido = document.querySelector(".add-solicitud-libro");
var botonesDelPedido = document.querySelectorAll(".cancel-pedido");
var modalSolicitarLibroClose = document.querySelector(".close-modal-solicitar");
var modalSolicitarLibroCancel = document.querySelector(".cancel-modal-solicitar");

var modalSolicitarLibro = document.querySelector(".modal-solicitar");

var inputAddSolicitudTitulo = document.querySelector(".solicitud-ad.titulo");
var inputAddSolicitudAutor = document.querySelector(".solicitud-ad.autor");
var inputAddSolicitudEditorial = document.querySelector(".solicitud-ad.editorial");
var inputAddSolicitudMateria = document.querySelector(".solicitud-ad.materia");
var inputAddSolicitudOrigen = document.querySelector(".solicitud-ad.origen");
var inputAddSolicitudAnio = document.querySelector(".solicitud-ad.anio");
var inputAddSolicitudEdicion = document.querySelector(".solicitud-ad.edicion");
var inputAddSolicitudCantidad = document.querySelector(".solicitud-ad.cantidad");
var inputAddSolicitudObservacion = document.querySelector(".solicitud-ad.observacion");


// ****************************************************************************
//                                Fin Elementos 
// ****************************************************************************




// *****************************************************************
//                           Eventos de pedidos
// *****************************************************************

modalSolicitarLibroClose.addEventListener("click", ()=>{
    modalSolicitarLibro.classList.remove('active');
});

modalSolicitarLibroCancel.addEventListener("click", ()=>{
    modalSolicitarLibro.classList.remove('active');
});

botonAddPedido.addEventListener("click",()=>{
    modalSolicitarLibro.classList.add('active');
});

// *****************************************************************
//                                Fin Eventos
// *****************************************************************

