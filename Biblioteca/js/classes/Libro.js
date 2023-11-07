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

    unpackJSON(json){
        this.isbn = json.isbn;
        this.titulo = json.titulo;
        this.autor = json.autor;
        this.ubicacionFisica = json.ubicacionFisica;
        this.editorial = json.editorial;
        this.materia = json.materia;
        this.lugarEdicion = json.lugarEdicion;
        this.anio = json.anio;
        this.serie = json.serie;
        this.observaciones = json.observaciones;
    }


    //Getters
    get isbn(){
        return this.isbn;
    }

    get titulo(){
        return this.titulo;
    }

    get autor(){
        return this.autor;
    }

    get ubicacionFisica(){
        return this.ubicacionFisica;
    }

    get lugarEdicion(){
        return this.lugarEdicion;
    }

    get anio(){
        return this.anio;
    }

    get serie(){
        return this.serie;
    }

    get observaciones(){
        return this.observaciones;
    }

    //Setters
    set isbn(isbn){
        this.isbn = isbn;
    }

    set titulo(titulo){
        this.titulo = titulo;
    }

    set autor(autor){
        this.autor = autor;
    }

    set ubicacionFisica(ubicacionFisica){
        this.ubicacionFisica = ubicacionFisica;
    }

    set lugarEdicion(lugarEdicion){
        this.lugarEdicion = lugarEdicion;
    }

    set anio(anio){
        this.anio = anio;
    }

    set serie(serie){
        this.serie = serie;
    }

    set observaciones(observaciones){
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
        this.listaLibrosBM = {};
    }

    //Getters
    get listaLibros(){
        return this.listaLibros;
    }

    //Setters
    set listaLibros(listaLibros){
        this.listaLibros = listaLibros;
    }
    
    cargarListaEn(target){
        let listado = "";
        
        if(this.listaLibrosBM.lenght != 0){
            for(this.listaLibrosBM of libro){
                listado += (new Libro(libro)).printBoxLibroBM();
            }

            document.querySelector(target).innerHTML(listado);
        }else{
            document.querySelector(target).innerHTML("<p>No se han encontrado resultados.</p>");
        }
    }

    solicitudAjaxBuscar(data, target){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "php/respuestaServidor.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //let response = JSON.parse(xhr.responseText); //el json que envía el servidor
                //this.listaLibrosBM = response;
                this.listaLibrosBM = xhr.responseText;

                let listado = "";
        
                if(this.listaLibrosBM.lenght != 0){
                    for(this.listaLibrosBM of libro){
                        listado += (new Libro(libro)).printBoxLibroBM();
                    }

                    document.querySelector(target).innerHTML(listado);
                }else{
                    document.querySelector(target).innerHTML("<p>No se han encontrado resultados.</p>");
                }


                //this.cargarListaEn(target);

            } else if (xhr.readyState == 4 && xhr.status != 200) {
                console.error("Error en la solicitud: " + xhr.status);
            }
        };
    
        xhr.send(JSON.stringify(data)); //Envía la info al servidor en formato string de json
    }

    solicitudAjaxABM(libro, target, archivoPHP){
        let data;
        if(libro != null)
            data = JSON.stringify(libro.toJson());
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", archivoPHP, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText); //el json que envía el servidor
                
                this.listaLibrosBM = JSON.parse(response);
                cargarListaEn(target);

            } else if (xhr.readyState == 4 && xhr.status != 200) {
                console.error("Error en la solicitud: " + xhr.status);
            }
        };
    
        xhr.send(JSON.stringify(data)); //Envía la info al servidor en formato string de json
    }

}

var libroCtrl = new LibroController();

// Eventos de libros  (buscadores)

document.querySelector(".icon-search.buscarLibroBM").addEventListener("click",()=>{
    libroCtrl.solicitudAjaxBuscar(document.querySelector(".inputLibroBM").value, ".bm-libro-result.librosBM");
});