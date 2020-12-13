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
    prod = JSON.parse(localStorage.getItem("Prod-selec"));
    cargarProducto();
})();

function cargarProducto() {
    producto = `<div class="col-md-6 col-12">
                        <img src="${prod._url}" class="img-fluid img-thumbnail" alt="...">
                    </div>
                    <div class="col-md-6 col-12">
                        <form>
                            <div class="form-group">
                                <h1 class="h2 mt-md-0 mt-4">${prod._nombre}</h1>
                                <label>Ofrecido por ${prod._user._nom}</label>
                                <hr class="bg-secondary w-100 mt-4">
                            </div>
                            <div class="form-group">
                                <h2 class="h3">Descripcion</h2>
                                <p class="h6 mt-4">${prod._descripcion}</p>
                            </div>
                            <div class="form-group">
                                <h2 class="h3 mt-5">Busco</h2>
                                <p class="h6 mt-4">${prod._busqueda}</p>
                                <hr class="bg-secondary w-100 mt-5">
                            </div>
                            <div class="form-group mt-5">
                                <button type="submit" class="btn btn-secondary btn-lg">Agregar</button>
                            </div>
                        </form>
                    </div>`;
    var ob = document.createElement("div")
    ob.className = "row";
    ob.innerHTML = producto;
    document.getElementById('base').appendChild(ob);
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