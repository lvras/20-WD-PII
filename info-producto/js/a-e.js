const formulario = document.getElementById("form");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("url");
const busqueda = document.getElementById("busco");
var User;
let arrayProductos = [];
var contador = 1;

(() => {
    User = JSON.parse(localStorage.getItem("User-Log"));
    arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    if (arrayProductos === null) {
        arrayProductos = [];
    }
})();

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(arrayProductos.length != 0){
        contador = arrayProductos[arrayProductos.length - 1]._id + 1;
    }
    var pro = new Producto(contador, User, nombre.value, descripcion.value, imagen.value, busqueda.value);
    registrar(pro);
    formulario.reset();
    window.location.assign('../dashboard/dashboard.html')
})

function registrar(pro) {
    arrayProductos.push(pro);
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