var arrayProductos;
var user;
var cont = 0;

(() => {
    user = JSON.parse(localStorage.getItem("User-Log"));
    arrayProductos = JSON.parse(localStorage.getItem("Productos")).reverse();
    console.log(arrayProductos);
    if (arrayProductos === null) {
        arrayProductos = [];
    }
    cargarProducto();
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
                console.log(element);
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