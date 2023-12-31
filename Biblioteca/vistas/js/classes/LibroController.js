// *****************************************************************
//              Elementos de la vista libro (GLOBALES)
// *****************************************************************

// ------------------------  Buscar libro  ------------------------
var filtroBuscarLibrosBM = document.querySelector(".filtro-libro-bm");
var botonBuscarLibrosBM = document.querySelector(".icon-search.buscarLibroBM");
var inputBuscarLibrosBM = document.querySelector(".inputLibroBM");
var listadoResultadosLibrosBM = document.querySelector(".bm-libro-result.librosBM");

// ------------------------  Agregar libro + Modal  ------------------------
var modalAddLibroClose = document.querySelector(".close-modal-add-libro");
var modalAddLibroCancel = document.querySelector(".cancel-modal-add-libro");
var modalAddLibro = document.querySelector(".modal-add-libro");
var modalAddLibroOpen = document.querySelector(".add-new-libro");
var modalAddBotonSend = document.querySelector(".confirm-modal-add-libro");
var modalStatusAddLibro = document.querySelector(".db-add-libro");

var campoTituloAdd = document.querySelector(".libro-add.titulo");
var campoAutorAdd = document.querySelector(".libro-add.autor");
var campoUbicacionAdd = document.querySelector(".libro-add.ubicacion");
var campoEditorialAdd = document.querySelector(".libro-add.editorial");
var campoMateriaAdd = document.querySelector(".libro-add.materia");
var campoOrigenAdd = document.querySelector(".libro-add.origen");
var campoAnioAdd = document.querySelector(".libro-add.anio");
var campoEdicionAdd = document.querySelector(".libro-add.edicion");
var campoObservacionAdd = document.querySelector(".libro-add.observacion");


// ------------------------  Editar libro + modal  ------------------------
var modalEditLibroClose = document.querySelector(".close-modal-edit-libro");
var modalEditLibroCancel = document.querySelector(".cancel-modal-edit-libro");
var modalEditLibro = document.querySelector(".modal-frame.modal-edit-libro");
var botonEditLibroOpen;
var modalEditBotonSend = document.querySelector(".confirm-modal-edit-libro");
var modalStatusEditLibro = document.querySelector(".db-edit-libro");

var campoTituloEdit = document.querySelector(".libro-edit.titulo");
var campoAutorEdit = document.querySelector(".libro-edit.autor");
var campoUbicacionEdit = document.querySelector(".libro-edit.ubicacion");
var campoEditorialEdit = document.querySelector(".libro-edit.editorial");
var campoMateriaEdit = document.querySelector(".libro-edit.materia");
var campoOrigenEdit = document.querySelector(".libro-edit.origen");
var campoAnioEdit = document.querySelector(".libro-edit.anio");
var campoEdicionEdit = document.querySelector(".libro-edit.edicion");
var campoObservacionEdit = document.querySelector(".libro-edit.observacion");


// ------------------------ Eliminar libro + modal ------------------------
var modalDelLibroClose = document.querySelector(".close-modal-del-libro");
var modalDelLibroCancel = document.querySelector(".cancel-modal-del-libro");
var modalDelLibro = document.querySelector(".modal-del-libro");
var botonDelLibroOpen;
var modalDelBotonSend = document.querySelector(".confirm-modal-del-libro");
var modalStatusDelLibro = document.querySelector(".db-del-libro");

var campoModalDelLibro = document.querySelector(".icon-book.del-libro-id");


// ------------------------ Boton descarga de pdf ----------------------------------
var botonDescargaPDF = document.querySelector(".descargar-pdf");





// *****************************************************************
//                              Fin elementos 
// *****************************************************************


class LibroController{
    constructor(){
        this.listaLibrosBM = null;
    }

    // ---------------  Metodos clase LibroController ---------------
    cantidadLibros(){
        if(this.listaLibrosBM)
            return this.listaLibrosBM.length;
        else
            return 0;
    }

    buscarLibroPorid(id){
        let aux;
        this.listaLibrosBM.forEach(function (l) {
            if(l.idLibro == id){
                aux = new Libro(l.idLibro, l.titulo, l.autor, l.ubicacionFisica, l.editorial, l.materia, l.lugarEdicion, l.anio, l.serie, l.observaciones);
                return aux.toJson();
            }
        });
        return aux;
    }

    solicitudAjaxBuscar(target, filtros, data){
        let datasend = {"funcion" : "search", "filtros": filtros, "data" : data};
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "controlador/libros_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let listaLibros = JSON.parse(xhr.responseText); //el json que envía el servidor
                let listado = "";


                libroCtrl.listaLibrosBM = listaLibros;

                if(listaLibros){
                    listaLibros.forEach(function (l) {
                        listado += (new Libro(l.idLibro, l.titulo, l.autor, l.ubicacionFisica, l.editorial, l.materia, l.lugarEdicion, l.anio, l.serie, l.observaciones)).printBoxLibroBM();
                    });

                    target.innerHTML = listado;

                    //Agregar eventos

                    botonEditLibroOpen = document.querySelectorAll(".edit-libro");
                    botonDelLibroOpen = document.querySelectorAll(".del-libro");

                    agregarEventoLibrosEditar();
                    agregarEventoLibrosEliminar();

                    //fin agregar eventos

                }else{
                    target.innerHTML = "<p>No se han encontrado resultados.</p>";
                }

            } else if (xhr.readyState == 4 && xhr.status != 200) {
                libroCtrl.listaLibrosBM = null;
                target.innerHTML = "<p>Se ha producido un error, intente nuevamente.</p>";
            }
        };
    
        xhr.send(JSON.stringify(datasend)); //Envía la info al servidor en formato string de json
    }

    solicitudAjaxABM(libro, accion){
        let data = {"funcion" : accion, "data" : libro};
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "controlador/libros_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText); //(el json de tipo {"status" : "ok"})
                
                switch(accion){
                    case "add":
                        if(response.status == "ok"){
                            modalStatusAddLibro.innerHTML = '<span class="icon-checkmark"> Libro agregado exitosamente</span>';
                            setTimeout(() => {
                                modalAddLibro.classList.remove("active");
                            }, 2000);
                        }else{
                            modalStatusAddLibro.innerHTML = '<span class="icon-blocked"> No se ha podido agregar el libro</span>';
                        }
                        break;
                    case "edit":
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
                    case "del":
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

var libroCtrl = new LibroController();


// *****************************************************************
//                           Eventos de libros
// *****************************************************************

// ------------------------  Evento buscar  ------------------------
botonBuscarLibrosBM.addEventListener("click",()=>{
    busquedaLibro();
});

function busquedaLibro(){
    libroCtrl.solicitudAjaxBuscar(listadoResultadosLibrosBM, filtroBuscarLibrosBM.value, inputBuscarLibrosBM.value);
}

// ------------------------  Eventos añadir libro  ------------------------

modalAddLibroClose.addEventListener("click", ()=>{
    modalAddLibro.classList.remove('active');
});

modalAddLibroCancel.addEventListener("click", ()=>{
    modalAddLibro.classList.remove('active');
});

modalAddLibroOpen.addEventListener("click",()=>{
    modalStatusAddLibro.innerHTML = "";

    campoTituloAdd.value = "";
    campoAutorAdd.value = "";
    campoUbicacionAdd.value = "";
    campoEditorialAdd.value = "";
    campoMateriaAdd.value = "";
    campoOrigenAdd.value = "";
    campoAnioAdd.value = "";
    campoEdicionAdd.value = "";
    campoObservacionAdd.value = "";
    
    modalAddLibro.classList.add('active');

});

modalAddBotonSend.addEventListener("click",()=>{
    if(campoTituloAdd.value != "" &&
        campoAutorAdd.value != "" &&
        campoUbicacionAdd.value != "" &&
        campoEditorialAdd.value != "" &&
        campoMateriaAdd.value != "" &&
        campoOrigenAdd.value != "" &&
        campoAnioAdd.value != "" &&
        campoEdicionAdd.value != "" &&
        campoObservacionAdd.value){
    
        let libro = new Libro(null,
        campoTituloAdd.value,
        campoAutorAdd.value,
        campoUbicacionAdd.value,
        campoEditorialAdd.value,
        campoMateriaAdd.value,
        campoOrigenAdd.value,
        campoAnioAdd.value,
        campoEdicionAdd.value,
        campoObservacionAdd.value);

        libroCtrl.solicitudAjaxABM(libro.toJson(),"add");

    }else{
        modalStatusAddLibro.innerHTML = "<span class='icon-warning'>Por favor complete los campos antes de enviar.</span>";
    }
});

// ------------------------  Eventos editar libro  ------------------------

modalEditLibroClose.addEventListener("click", ()=>{
    modalEditLibro.classList.remove('active');
});

modalEditLibroCancel.addEventListener("click", ()=>{
    modalEditLibro.classList.remove('active');
});

function agregarEventoLibrosEditar(){
    for (let i = 0; i < libroCtrl.cantidadLibros(); i++) {
        
        botonEditLibroOpen[i].addEventListener("click",()=>{
            let idLibro = botonEditLibroOpen[i].getAttribute("idLibro");
            let objLibro = libroCtrl.buscarLibroPorid(idLibro);
            modalStatusEditLibro.innerHTML = "";

            campoTituloEdit.value = objLibro.titulo;
            campoAutorEdit.value = objLibro.autor;
            campoUbicacionEdit.value = objLibro.ubicacionFisica;
            campoEditorialEdit.value = objLibro.editorial;
            campoMateriaEdit.value = objLibro.materia;
            campoOrigenEdit.value = objLibro.lugarEdicion;
            campoAnioEdit.value = objLibro.anio;
            campoEdicionEdit.value = objLibro.serie;
            campoObservacionEdit.value = objLibro.observaciones;
    
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


// ------------------------  Eventos eliminar libro  ------------------------

modalDelLibroClose.addEventListener("click", ()=>{
    modalDelLibro.classList.remove('active');
});

modalDelLibroCancel.addEventListener("click", ()=>{
    modalDelLibro.classList.remove('active');
});


function agregarEventoLibrosEliminar(){
    for (let i = 0; i < libroCtrl.cantidadLibros(); i++) {
        botonDelLibroOpen[i].addEventListener("click",()=>{
            let idLibro = botonDelLibroOpen[i].getAttribute("idLibro");
            let objLibro = libroCtrl.buscarLibroPorid(idLibro);
            
            modalStatusDelLibro.innerHTML = "";

            campoModalDelLibro.innerHTML = "<p>#"+objLibro.idLibro+" - "+ objLibro.titulo+"</p>";

            modalDelLibro.setAttribute("idLibroTemp", idLibro);

            modalDelLibro.classList.add('active');
        });
    }
}

modalDelBotonSend.addEventListener("click", ()=>{
    let libro = libroCtrl.buscarLibroPorid(modalDelLibro.getAttribute("idLibroTemp"));
    
    libroCtrl.solicitudAjaxABM(libro.toJson(),"del");
});


// ----------------------- Descargar Reporte de libros -----------------------------

botonDescargaPDF.addEventListener("click",()=>{
    window.open("libraries/examples/informe.php")
});