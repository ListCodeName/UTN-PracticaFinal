class Usuario{
    constructor(idUsuario, nombre, apellido, dni, direccion, email, edad, imgPerfil){
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.direccion = direccion;
        this.email = email;
        this.edad = edad;
        this.imgPerfil = imgPerfil;
    }

    //Getters
    get idUsuario(){
        return this.idUsuario;
    }

    get nombre(){
        return this.nombre;
    }

    get apellido(){
        return this.apellido;
    }

    get dni(){
        return this.dni;
    }

    get email(){
        return this.email;
    }

    get edad(){
        return this.edad;
    }


    get imgPerfil(){
        return this.imgPerfil;
    }

    //Setters

    set idUsuario(idUsuario){
        this.idUsuario = idUsuario;
    }

    set nombre(nombre){
        this.nombre =nombre;
    }

    set apellido(apellido){
        this.apellido =apellido;
    }

    set dni(dni){
        this.dni =dni;
    }

    set email(email){
        this.email = email;
    }

    set edad(edad){
        this.edad =edad;
    }


    set imgPerfil(imgPerfil){
        this.imgPerfil =imgPerfil;
    }

    //Metodos

    printBoxUsuario(){
        return '<div class="add-pre-item box-type1" >'+
                    '<h4>'+this.nombre+ ' ' +this.apellido +'</h4>'+
                    '<div class="add-pre-content box-type1-content">'+
                        '<span class="icon-home"><p>Alberdi 345</p></span>'+
                        '<span class="icon-phone"><p>+345515964</p></span>'+
                        '<span class="icon-mail"><p>pabloperez@gmail.com</p></span>'+
                    '</div>'+
                    '<div class="add-pre-btns box-type1-btns">'+
                        '<span class="icon-checkmark"></span>'+
                        '<span class="icon-cross"></span>'+
                    '</div>'+
                '</div>';
    }

}