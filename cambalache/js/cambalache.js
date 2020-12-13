var arrayProductos;
var user;

(() => {
    log = JSON.parse(sessionStorage.getItem("Log"));
    if (log != null){
        arriba = document.getElementById("logger1");
        abajo = document.getElementById("logger2");
        arriba.innerText = 'Dashboard'
        arriba.href = '../dashboard/dashboard.html'
        abajo.innerText = 'Dashboard'
        abajo.href = '../dashboard/dashboard.html'
    }

    user = JSON.parse(localStorage.getItem("User-Log"));
    arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    if (arrayProductos === null) {
        arrayProductos = [];
    }
    cargarProducto();
})();

function cargarProducto() {
    arrayProductos.reverse().forEach(element => {
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
        var ob = document.createElement("div")
        ob.className = "col";
        ob.innerHTML = produ;
        document.getElementById('base').appendChild(ob);
    })
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