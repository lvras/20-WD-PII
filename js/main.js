var arrayProductos;
var user;
var cont = 0;

(() => {
    user = JSON.parse(localStorage.getItem("User-Log"));
    log = JSON.parse(sessionStorage.getItem("Log"));
    if (log != null){
        arriba = document.getElementById("logger1");
        abajo = document.getElementById("logger2");
        arriba.innerText = 'Dashboard'
        arriba.href = './dashboard/dashboard.html'
        abajo.innerText = 'Dashboard'
        abajo.href = './dashboard/dashboard.html'
    }
    arrayProductos = JSON.parse(localStorage.getItem("Productos")).reverse();
    if (arrayProductos === null) {
        arrayProductos = [];
    }
    cargarProducto();
})();

(() => {
    arrayPersonas = JSON.parse(localStorage.getItem("Personas"));
    if (arrayPersonas === null) {
        arrayPersonas = [];
    }
})();

function cargarProducto(){
    arrayProductos.forEach(element => {
        if(cont == 0){
            img1 = document.getElementById("img1")
            img1.src = element._url
            img1.name = element._id
            img1.innerHTML
            t1 = document.getElementById("t1")
            t1.innerText = element._nombre
        } else if(cont == 1){
            img2 = document.getElementById("img2")
            img2.src = element._url
            img2.name = element._id
            img2.innerHTML
            t2 = document.getElementById("t2")
            t2.innerText = element._nombre
        }
        cont ++;
    });
}

const img = document.querySelectorAll('img');

img.forEach(function(item){
    item.addEventListener('click', function(){
        arrayProductos.forEach(element => {
            if(element._id == item.name){
                localStorage.setItem("Prod-selec", JSON.stringify(element));
                window.location.assign('../producto/producto.html');
            }
        })
    })
})


$('.carousel').carousel({
    interval: 4000
})

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

const formulario = document.querySelector('#search');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado');
const list = document.querySelectorAll('li');

const filtrar = ()=>{
    resultado.innerHTML = '';
    resultado.style.display = 'block';
    const texto = formulario.value.toLowerCase();
    for(let producto of arrayProductos){
        let nombre = producto._nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            resultado.innerHTML += `
            <li class = "ops mt-1" id = "${producto._id}">${producto._nombre}</li>`
        }
    }

    if (resultado.innerHTML === '') {
        resultado.innerHTML += `
            <li>Producto no encontrado...</li>`
    }

    if (formulario.value === '') {
        resultado.style.display = 'none';
    }
}

attachEvent(resultado, "click", EventHandler);

function attachEvent(element, type, handler) {
    if (element.addEventListener) element.addEventListener(type, handler, false);
    else element.attachEvent("on"+type, handler);
}

function EventHandler(e) {
    arrayProductos.forEach(element => {
        if(element._id == e.target.id){
            localStorage.setItem("Prod-selec", JSON.stringify(element));
            window.location.assign('../producto/producto.html');
        }
    })
}

boton.addEventListener('click', filtrar);
formulario.addEventListener('keyup', filtrar);