const texto = document.getElementById("text");
var arrayProductos;
var user;

(() => {
    user = JSON.parse(localStorage.getItem("User-Log"));
    tex = `Bienvenido ${user._nom}, aqui podra encontrar el estado de sus Camabalaches y sus productos registrados.`
    texto.innerHTML = tex;
    arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    if (arrayProductos === null) {
        arrayProductos = [];
    }
    cargarProducto();
})();

function cargarProducto() {
    arrayProductos.forEach(element => {
        if(element._user._id == user._id){
            produ = `<div class="card mb-3">
                        <div class="row">
                            <div class="col-md-5 col-lg-6">
                                <img src="${element._url}" alt="..." class="img-fluid" />
                            </div>
                            <div class="col-md-7 col-lg-6">
                                <div class="card-body">
                                    <h5 class="card-title">${element._nombre}</h5>
                                    <button type="submit" class="btn btn-success mb-3 e-e">Editar</button>
                                    <button type="submit" class="btn btn-danger e-e">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
            var ob = document.createElement("div")
            ob.className = "col";
            ob.innerHTML = produ;
            document.getElementById('base').appendChild(ob);
        }
    })
}

document.querySelector('#new').addEventListener('click', e => {
    e.preventDefault();
    window.location.assign('../info-producto/agregar-producto.html')
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