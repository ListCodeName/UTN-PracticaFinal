// *****************************************************************
//              Elementos de la vista user (GLOBALES)
// *****************************************************************

//  ----------------------- Buscar Usuario BM -----------------------
var inputBuscarUsuarioBM = document.querySelector(".icon-search.buscar-usuario-bm");
var botonBuscarUsuarioBM = document.querySelector(".input-buscar-usuario-bm");
var filtrosBuscarUsuarioBM = document.querySelector(".filtro-buscar-usuario-bm");
var fieldBuscarUsuarioBM = document.querySelector(".bm-user-result");

// ----------------------- Agregar Usuario -----------------------
var modalAddUserClose = document.querySelector(".close-modal-add-user");
var modalAddUserCancel = document.querySelector(".cancel-modal-add-user");
var modalAddUser = document.querySelector(".modal-frame.modal-add-user");
var botonAddUserOpen = document.querySelector(".add-new-user");
var botonAddUserSend = document.querySelector(".confirm-modal-add-user");
var fieldAddUserStatus = document.querySelector(".modal-form1-status.db-add-user");

var inputAddUserModalNombre = document.querySelector(".input-add-user.nombre");
var inputAddUserModalApellido = document.querySelector(".input-add-user.apellido");
var inputAddUserModalDNI = document.querySelector(".input-add-user.dni");
var inputAddUserModalFechaNac = document.querySelector(".input-add-user.fechaNac");
var inputAddUserModalDomicilio = document.querySelector(".input-add-user.direccion");
var inputAddUserModalEmail = document.querySelector(".input-add-user.email");
var inputAddUserModalTelefono = document.querySelector(".input-add-user.telefono");


// ----------------------- Editar Usuario -----------------------
var modalEditUserClose = document.querySelector(".close-modal-edit-user");
var modalEditUserCancel = document.querySelector(".cancel-modal-edit-user");
var modalEditUser = document.querySelector(".modal-frame.modal-edit-user");
var botonEditUserOpen = document.querySelectorAll(".edit-user-bm");


var inputEditUserModalNombre = document.querySelector(".input-edit-user.nombre");
var inputEditUserModalApellido = document.querySelector(".input-edit-user.apellido");
var inputEditUserModalDNI = document.querySelector(".input-edit-user.dni");
var inputEditUserModalFechaNac = document.querySelector(".input-edit-user.fechaNac");
var inputEditUserModalDomicilio = document.querySelector(".input-edit-user.direccion");
var inputEditUserModalEmail = document.querySelector(".input-edit-user.email");
var inputEditUserModalTelefono = document.querySelector(".input-edit-user.telefono");


// ----------------------- Penalizar Usuario -----------------------
var modalPenalUserClose = document.querySelector(".close-modal-penal-user");
var modalPenalUserCancel = document.querySelector(".cancel-modal-penal-user");
var modalPenalUser = document.querySelector(".modal-frame.modal-penal-user");
var botonPenalUserOpen = document.querySelectorAll(".penal-user-bm");


// ----------------------- Eliminar Usuario -----------------------
var modalDelUserClose = document.querySelector(".close-modal-del-user");
var modalDelUserCancel = document.querySelector(".cancel-modal-del-user");
var modalDelUser = document.querySelector(".modal-frame.modal-del-user");
var botonDelUserOpen = document.querySelectorAll(".del-user-bm");


// *****************************************************************
//                              Fin elementos 
// *****************************************************************




class Usuario{
    constructor(idUsuario, nombre, apellido, dni, direccion, telefono, email, fechaNac){
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.fechaNac = fechaNac;
    }

    // --------------  Metodos clase Usuario  -------------------
    printBoxUsuarioPreRegistrado(){
        return '<div class="add-pre-item box-type1" >'+
                    '<h4>'+this.nombre+ ' ' +this.apellido +'</h4>'+
                    '<div class="add-pre-content box-type1-content">'+
                        '<span class="icon-home"><p>'+this.direccion+'</p></span>'+
                        '<span class="icon-phone"><p>'+this.telefono+'</p></span>'+
                        '<span class="icon-mail"><p>'+this.email+'</p></span>'+
                    '</div>'+
                    '<div class="add-pre-btns box-type1-btns">'+
                        '<span idUsuario="'+this.idUsuario+'" class="icon-checkmark"></span>'+
                        '<span idUsuario="'+this.idUsuario+'" class="icon-cross"></span>'+
                    '</div>'+
                '</div>';
    }

    printBoxUsuarioABM(){
        return '<div class="add-pre-item box-type1">'+
                    '<h4>'+this.nombre+' '+this.apellido+'</h4>'+
                    '<div class="add-pre-content box-type1-content">'+
                        '<span class="icon-home"><p>'+this.direccion+'</p></span>'+
                        '<span class="icon-phone"><p>'+this.telefono+'</p></span>'+
                        '<span class="icon-mail"><p>'+this.email+'</p></span>'+
                    '</div>'+
                    '<div class="add-pre-btns box-type1-btns">'+
                        '<span idUsuario="'+this.idUsuario+'" class="icon-hammer2 penal-user-bm"></span>'+
                        '<span idUsuario="'+this.idUsuario+'" class="icon-pencil edit-user-bm"></span>'+
                        '<span idUsuario="'+this.idUsuario+'" class="icon-bin del-user-bm"></span>'+
                    '</div>'+
                '</div>';
    }

    printBoxUsuario(){
        return '<div idUsuario="'+this.idUsuario+'" class="add-pre-item box-type1">'+
                    '<h4>'+this.nombre+' '+this.apellido+'</h4>'+
                    '<div class="add-pre-content box-type1-content">'+
                        '<span class="icon-home"><p>'+this.direccion+'</p></span>'+
                        '<span class="icon-phone"><p>'+this.telefono+'</p></span>'+
                        '<span class="icon-mail"><p>'+this.email+'</p></span>'+
                    '</div>'+
                    '<div class="add-pre-btns box-type1-btns">'+
                    '</div>'+
                '</div>';
    }

    toJson(){
        return {
            "idUsuario" : this.idUsuario,
            "nombre" : this.nombre,
            "apellido" : this.apellido,
            "dni" : this.dni,
            "direccion" : this.direccion,
            "telefono" : this.telefono,
            "email" : this.email,
            "fechaNac" : this.fechaNac
        };
    }
}


class UsuarioController{
    constructor(){
        this.listaUsuarioBM = null;
    }

    // ---------------  Metodos clase UsuarioController ---------------
    cantidadLibros(){
        if(this.listaUsuarioBM)
            return this.listaUsuarioBM.length;
        else
            return 0;
    }

    buscarLibroPorid(id){
        let aux;
        this.listaUsuarioBM.forEach(function (l) {
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
        xhr.open("POST", "controlador/usuarios_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.listaUsuarioBM = JSON.parse(xhr.responseText); //el json que envía el servidor
                let listado = "";


                libroCtrl.listaUsuarioBM = this.listaUsuarioBM;

                if(this.listaUsuarioBM){
                    this.listaUsuarioBM.forEach(function (l) {
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
                    document.querySelector(target).innerHTML = "<p>No se han encontrado resultados.</p>";
                }

            } else if (xhr.readyState == 4 && xhr.status != 200) {
                this.listaUsuarioBM = null;
                console.error("Error en la solicitud: " + xhr.status);
            }
        };
    
        xhr.send(JSON.stringify(datasend)); //Envía la info al servidor en formato string de json
    }

    solicitudAjaxABM(user, accion){
        let data = {"funcion" : accion, "data" : user};
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "controlador/usuarios_controlador.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText); //(el json de tipo {"status" : "ok"})
                
                switch(accion){
                    case "add":
                        if(response.status == "ok"){
                            modalStatusAdd.innerHTML = '<span class="icon-checkmark"> Usuario agregado exitosamente</span>';
                        }else{
                            modalStatusAdd.innerHTML = '<span class="icon-blocked"> No se ha podido agregar el usuario</span>';
                        }
                        break;
                    case "edit":
                        if(response.status == "ok"){
                            modalStatusEdit.innerHTML = '<span class="icon-checkmark"> Libro editado exitosamente</span>';
                            solicitudAjaxBuscar(listadoResultadosLibrosBM, filtroBuscarLibrosBM.value, inputBuscarLibrosBM.value);
                        }else{
                            modalStatusEdit.innerHTML = '<span class="icon-blocked"> No se ha podido editar el libro</span>';
                        }
                        break;
                    case "del":
                        if(response.status == "ok"){
                            modalStatusDel.innerHTML = '<span class="icon-checkmark"> Libro eliminado exitosamente</span>';
                            solicitudAjaxBuscar(listadoResultadosLibrosBM, filtroBuscarLibrosBM.value, inputBuscarLibrosBM.value);
                        }else{
                            modalStatusDel.innerHTML = '<span class="icon-blocked"> No se ha podido eliminar el libro</span>';
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

var libroCtrl = new UsuarioController();




// *****************************************************************
//                           Eventos de user
// *****************************************************************

// ----------------------- Evento Buscar -----------------------





// ----------------------- Evento Agregar -----------------------
// ----------------------- Evento Editar -----------------------
// ----------------------- Evento Eliminar -----------------------
modalEditUserClose.addEventListener("click", ()=>{
    modalEditUser.classList.remove('active');
});

modalEditUserCancel.addEventListener("click", ()=>{
    modalEditUser.classList.remove('active');
});


modalPenalUserClose.addEventListener("click", ()=>{
    modalPenalUser.classList.remove('active');
});

modalPenalUserCancel.addEventListener("click", ()=>{
    modalPenalUser.classList.remove('active');
});


modalDelUserClose.addEventListener("click", ()=>{
    modalDelUser.classList.remove('active');
});

modalDelUserCancel.addEventListener("click", ()=>{
    modalDelUser.classList.remove('active');
});


for (var i = 0; i < botonDelUserOpen.length; i++) {
    
    botonEditUserOpen[i].addEventListener("click",()=>{
        modalEditUser.classList.add('active');
    });
    
    
    botonPenalUserOpen[i].addEventListener("click",()=>{
        modalPenalUser.classList.add('active');
    });
    
    
    botonDelUserOpen[i].addEventListener("click",()=>{
        modalDelUser.classList.add('active');
    });
    
}


modalAddUserClose.addEventListener("click", ()=>{
    modalAddUser.classList.remove('active');
});

modalAddUserCancel.addEventListener("click", ()=>{
    modalAddUser.classList.remove('active');
});

botonAddUserOpen.addEventListener("click",()=>{
    modalAddUser.classList.add('active');
});