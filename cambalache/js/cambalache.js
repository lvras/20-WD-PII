var arrayProductos;
var user;
var filtro;
var categoria;

(() => {
    log = JSON.parse(sessionStorage.getItem("Log"));
    if (log === null) {
        log = false;
    }
    if (log) {
        arriba = document.getElementById("logger1");
        abajo = document.getElementById("logger2");
        arriba.innerText = 'Dashboard';
        arriba.href = '../dashboard/dashboard.html';
        abajo.innerText = 'Dashboard';
        abajo.href = '../dashboard/dashboard.html';
    }

    arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    if (arrayProductos === null) {
        arrayProductos = [];
    }
    filtro = JSON.parse(sessionStorage.getItem("Filtro"));
    if (filtro === null) {
        filtro = '';
    }
    categoria = JSON.parse(sessionStorage.getItem("Categoria"));
    cargarProducto();
})();

function cargarProducto() {
    arrayProductos.reverse().forEach(element => {
        if (categoria != "") {
            if (categoria === element._categoria) {
                produ = `<div class="card mb-3">
                        <div class="row">
                            <div class="col-md-5 col-lg-6">
                                <img src="${element._url}" name="${element._id}" alt="..." class="img-fluid" />
                            </div>
                            <div class="col-md-7 col-lg-6">
                                <div class="card-body">
                                    <h5 class="card-title">${element._nombre}</h5>
                                    <p class="card-text">
                                    ${element._user._nom}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                var ob = document.createElement("div");
                ob.className = "col";
                ob.innerHTML = produ;
                document.getElementById('base').appendChild(ob);
            }
        } else {
            const texto = filtro.toLowerCase();
            let nombre = element._nombre.toLowerCase();
            if (nombre.indexOf(texto) !== -1) {
                produ = `<div class="card mb-3">
                        <div class="row">
                            <div class="col-md-5 col-lg-6">
                                <img src="${element._url}" name="${element._id}" alt="..." class="img-fluid" />
                            </div>
                            <div class="col-md-7 col-lg-6">
                                <div class="card-body">
                                    <h5 class="card-title">${element._nombre}</h5>
                                    <p class="card-text">
                                    ${element._user._nom}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                var ob = document.createElement("div");
                ob.className = "col";
                ob.innerHTML = produ;
                document.getElementById('base').appendChild(ob);
            }
        }
    })
    sessionStorage.setItem("Filtro", JSON.stringify(''));
    sessionStorage.setItem("Categoria", JSON.stringify(''));

}

const img = document.querySelectorAll('img');

img.forEach(function (item) {
    item.addEventListener('click', function () {
        arrayProductos.forEach(element => {
            if (element._id == item.name) {
                localStorage.setItem("Prod-selec", JSON.stringify(element));
                window.location.assign('../producto/producto.html');
            }
        })
    })
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