//Elementos de la vista libro
//Agregar libro + Modal
var modalAddLibroClose = document.querySelector(".close-modal-add-libro");
var modalAddLibroCancel = document.querySelector(".cancel-modal-add-libro");
var modalAddLibro = document.querySelector(".modal-add-libro");
var modalAddLibroOpen = document.querySelector(".add-new-libro");
var modalAddBotonSend = document.querySelector("confirm-modal-add-libro");
var modalStatusAdd = document.querySelector(".db-add-libro");

var campoTituloAdd = document.querySelector(".libro-add.titulo");
var campoEditorialAdd = document.querySelector(".libro-add.editorial");
var campoAutorAdd = document.querySelector(".libro-add.autor");
var campoAnioAdd = document.querySelector(".libro-add.anio");
var campoEdicionAdd = document.querySelector(".libro-add.edicion");
var campoUbicacionAdd = document.querySelector(".libro-add.ubicacion");
var campoObservacionAdd = document.querySelector(".libro-add.observacion");


//Editar libro + modal
var modalEditLibroClose = document.querySelector(".close-modal-edit-libro");
var modalEditLibroCancel = document.querySelector(".cancel-modal-edit-libro");
var modalEditLibro = document.querySelector(".modal-frame.modal-edit-libro");
var modalEditLibroOpen = document.querySelectorAll(".edit-libro");
var modalEditBotonSend = document.querySelector("confirm-modal-edit-libro");
var modalStatusEdit = document.querySelector(".db-edit-libro");

var campoTituloEdit = document.querySelector(".libro-edit.titulo");
var campoEditorialEdit = document.querySelector(".libro-edit.editorial");
var campoAutorEdit = document.querySelector(".libro-edit.autor");
var campoAnioEdit = document.querySelector(".libro-edit.anio");
var campoEdicionEdit = document.querySelector(".libro-edit.edicion");
var campoUbicacionEdit = document.querySelector(".libro-edit.ubicacion");
var campoObservacionEdit = document.querySelector(".libro-edit.observacion");



var modalPedidoLibroClose = document.querySelector(".close-modal-edit-libro-pedido");
var modalPedidolibroCancel = document.querySelector(".cancel-modal-edit-libro-pedido");
var modalPedidoLibro = document.querySelector(".modal-edit-libro-pedido");
var modalPedidoLibroOpen = document.querySelectorAll(".edit-libro-pedido");

var modalDelLibroClose = document.querySelector(".close-modal-del-libro");
var modalDelLibroCancel = document.querySelector(".cancel-modal-del-libro");
var modalDelLibro = document.querySelector(".modal-del-libro");
var modalDelLibroOpen = document.querySelectorAll(".del-libro");



//Fin elementos 


class Libro{
    
    constructor(isbn, titulo, autor, ubicacionFisica, editorial, materia, lugarEdicion, anio, serie, observaciones){
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.ubicacionFisica = ubicacionFisica;
        this.editorial = editorial;
        this.materia = materia;
        this.lugarEdicion = lugarEdicion;
        this.anio = anio;
        this.serie = serie;
        this.observaciones = observaciones;
    }

    //Metodos

    printBoxLibroBM(){
        return '<div class="add-pre-item box-type1">'+
                '<h4>'+this.titulo+'</h4>'+
                '<div class="add-pre-content box-type1-content">'+
                    '<span class="icon-quill" title="Autor"><p>'+this.autor+'</p></span>'+
                    '<span class="icon-book" title="Materia"><p>'+this.materia+'</p></span>'+
                    '<span class="icon-library" title="Editorial"><p>'+this.editorial+'</p></span>'+
                '</div>'+
                '<div class="add-pre-btns box-type1-btns">'+
                    '<span isbn="'+this.isbn+'" class="icon-pencil edit-libro"></span>'+
                    '<span isbn="'+this.isbn+'" class="icon-bin del-libro"></span>'+
                '</div>'+
            '</div>';
    }

    printBoxLibro(){
        return '<div class="add-pre-item box-type1">'+
                '<h4>'+this.titulo+'</h4>'+
                '<div class="add-pre-content box-type1-content">'+
                    '<span class="icon-quill" title="Autor"><p>'+this.autor+'</p></span>'+
                    '<span class="icon-book" title="Materia"><p>'+this.materia+'</p></span>'+
                    '<span class="icon-library" title="Editorial"><p>'+this.editorial+'</p></span>'+
                '</div>'+
                '<div class="add-pre-btns box-type1-btns">'+
                '</div>'+
            '</div>';
    }



    toJson(){
        return {
            "isbn" : this.isbn,
            "titulo" : this.titulo,
            "autor" : this.autor,
            "ubicacionFisica" : this.ubicacionFisica,
            "editorial" : this.editorial,
            "materia" : this.materia,
            "lugarEdicion" : this.lugarEdicion,
            "anio" : this.anio,
            "serie" : this.serie,
            "observaciones" : this.observaciones
        }
    }



}


class LibroController{
    
    constructor(){
        this.listaLibrosBM = null;
    }

    buscarLibroPorid(id){
        this.listaLibrosBM.forEach(function (l) {
            if(l.isbn == id)
                return new Libro(l.isbn, l.titulo, l.autor, l.ubicacionFisica, l.editorial, l.materia, l.lugarEdicion, l.anio, l.serie, l.observaciones);
        });
    }

    solicitudAjaxBuscar(data, target){
        let datasend = {"search": data};
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "controlador/libros_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.listaLibrosBM = JSON.parse(xhr.responseText); //el json que envía el servidor
                let listado = "";

                if(this.listaLibrosBM){
                    this.listaLibrosBM.forEach(function (l) {
                        listado += (new Libro(l.isbn, l.titulo, l.autor, l.ubicacionFisica, l.editorial, l.materia, l.lugarEdicion, l.anio, l.serie, l.observaciones)).printBoxLibroBM();
                    });

                    document.querySelector(target).innerHTML = listado;

                    //Agregar eventos
                    for (var i = 0; i < modalDelLibroOpen.length; i++) {
                
                        modalEditLibroOpen[i].addEventListener("click",()=>{
                            modalEditLibro.classList.add('active');
                        });
                        
                        modalDelLibroOpen[i].addEventListener("click",()=>{
                            modalDelLibro.classList.add('active');
                        });
                        
                    }

                    modalDelLibroClose.addEventListener("click", ()=>{
                        modalDelLibro.classList.remove('active');
                    });
                    
                    modalDelLibroCancel.addEventListener("click", ()=>{
                        modalDelLibro.classList.remove('active');
                    });

                    modalEditLibroClose.addEventListener("click", ()=>{
                        modalEditLibro.classList.remove('active');
                    });
                    
                    modalEditLibroCancel.addEventListener("click", ()=>{
                        modalEditLibro.classList.remove('active');
                    });
                    //fin agregar eventos

                }else{
                    document.querySelector(target).innerHTML = "<p>No se han encontrado resultados.</p>";
                }

            } else if (xhr.readyState == 4 && xhr.status != 200) {
                console.error("Error en la solicitud: " + xhr.status);
            }
        };
    
        xhr.send(JSON.stringify(datasend)); //Envía la info al servidor en formato string de json
    }

    solicitudAjaxABM(libro, accion){
        let data = {accion : libro};
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "controlador/libros_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText); //(el json de tipo {"status" : "ok"})
                
                switch(accion){
                    case "add":
                        if(response.status == "ok"){
                            modalStatusAdd.innerHTML = '<span class="icon-checkmark"> Libro agregado exitosamente</span>';
                            
                        }else{
                            modalStatusAdd.innerHTML = '<span class="icon-blocked"> No se ha podido agregar el libro</span>';
                        }
                        break;
                    case "edit":
                        if(response.status == "ok"){
                            modalStatusEdit.innerHTML = '<span class="icon-checkmark"> Libro agregado exitosamente</span>';
                            
                        }else{
                            modalStatusEdit.innerHTML = '<span class="icon-blocked"> No se ha podido agregar el libro</span>';
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

// Eventos de libros

// Evento buscar
document.querySelector(".icon-search.buscarLibroBM").addEventListener("click",()=>{
    libroCtrl.solicitudAjaxBuscar(document.querySelector(".inputLibroBM").value, ".bm-libro-result.librosBM");
});

// Eventos añadir libro

modalAddBotonSend.addEventListener("click",()=>{
    let libro = new Libro(
    campoTituloAdd.value,
    campoEditorialAdd.value,
    campoAutorAdd.value,
    campoAnioAdd.value,
    campoEdicionAdd.value,
    campoUbicacionAdd.value,
    campoObservacionAdd.value);

    libroCtrl.solicitudAjaxABM(libro.toJson(),"add");
});

// Eventos editar libro

modalEditBotonSend.addEventListener("click", ()=>{
    let libro = new Libro(
        campoTituloEdit.value,
        campoEditorialEdit.value,
        campoAutorEdit.value,
        campoAnioEdit.value,
        campoEdicionEdit.value,
        campoUbicacionEdit.value,
        campoObservacionEdit.value);
    
    libroCtrl.solicitudAjaxABM(libro.toJson(),"edit");
});