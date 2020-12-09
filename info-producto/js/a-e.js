const formulario = document.getElementById("form");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("url");
const busqueda = document.getElementById("busco");
var User;
var estado;
let arrayProductos = [];
var contador = 1;
var prod = JSON.parse(localStorage.getItem("Prod-edit"));

(() => {
    User = JSON.parse(localStorage.getItem("User-Log"));
    arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    if (arrayProductos === null) {
        arrayProductos = [];
    }
    console.log(arrayProductos);

    estado = JSON.parse(localStorage.getItem("Editar"));
    if(estado){
        nombre.value = prod._nombre;
        descripcion.value = prod._descripcion;
        imagen.value = prod._url;
        busqueda.value = prod._busqueda;
    }
})();

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!estado){
        if(arrayProductos.length != 0){
            contador = arrayProductos[arrayProductos.length - 1]._id + 1;
        }
        var pro = new Producto(contador, User, nombre.value, descripcion.value, imagen.value, busqueda.value);
    } else {
        var pro = new Producto(prod._id, prod._user, nombre.value, descripcion.value, imagen.value, busqueda.value);
    }
    registrar(pro);
    formulario.reset();
    window.location.assign('../dashboard/dashboard.html')
})

formulario.addEventListener("reset", (e) => {
    if(estado){
        window.location.assign('../dashboard/dashboard.html')
    }
})

function registrar(pro) {
    if(estado){
        arrayProductos.forEach(element => {
            if(element._id == prod._id){
                arrayProductos.splice(arrayProductos.indexOf(element), 1, pro)
            }
        });
    } else {
        arrayProductos.push(pro);
    }
    localStorage.setItem("Productos", JSON.stringify(arrayProductos));
}

class Producto {
    constructor(id, user, nombre, descripcion, url, busqueda){
        this._id = id;
        this._user = user;
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._url = url;
        this._busqueda = busqueda;
    }
}

$(document).ready(function () {
    $('#button-nav').click(function () {
        $('#line1').hide();
        $('#line2').hide();
    })

    $(window).resize(function () {
        $('#line1').show();
        $('#line2').show();
    })

    $(window).resize(function () {
        var width = $(window).width();
        if (width <= 400) {
            $('#line1b').hide();
            $('#line2b').hide();
        }
        if (width >= 401) {
            $('#line1b').show();
            $('#line2b').show();
        }
    });
})