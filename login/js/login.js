const email = document.getElementById("email");
const contrasenna = document.getElementById("contra");
const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const mensaje = document.getElementById("warnings");
let arrayPersonas = [];

formulario.addEventListener("reset", e => {
    mensaje.innerHTML = "";
})

function userLog(per) {
    localStorage.setItem("User-Log", JSON.stringify(per))
}

(() => {
    arrayPersonas = JSON.parse(localStorage.getItem("Personas"));
    if (arrayPersonas === null) {
        arrayPersonas = [];
    }
})();

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    estado = '';
    corr = '';
    let per;
    if (email.value == '' && contrasenna.value == '') {} else {
        if (arrayPersonas.length === 0) {
            estado = 'vacio';
            alerta(estado);
        } else {
            arrayPersonas.forEach(element => {
                if (element._email == email.value) {
                    corr = element._email;
                }
                if (element._email == email.value && element._contra == contrasenna.value) {
                    per = element;
                }
            })
            if (per == null) {
                if (corr != '') {
                    estado = 'contra'
                    alerta(estado);
                } else {
                    estado = 'usuario'
                    alerta(estado);
                }
            } else {
                userLog(per);
                estado = 'encontro';
                alerta(estado);
            }
        }
    }
})

function alerta(estado) {
    document.getElementById("warnings").classList.remove("msg");
    document.getElementById("warnings").classList.add("msg-active");
    if (estado == 'encontro') {
        formulario.reset();
        document.getElementById("warnings").classList.remove("msg-active");
        document.getElementById("warnings").classList.add("msg");
        window.location.assign('../dashboard/dashboard.html')
    } else if (estado == 'usuario') {
        warnings = `Usuario no registrado <br>`
        mensaje.innerHTML = warnings;
    } else if (estado == 'contra') {
        warnings = `Contraseña incorrecta <br>`
        mensaje.innerHTML = warnings;
    } else if (estado == 'vacio') {
        warnings = `No hay usuarios registrados, por favor registrese <br>`
        mensaje.innerHTML = warnings;
    }
}

const limpiarMensaje = (e) => {
    mensaje.innerHTML = "";
    switch (e.target.name) {
        case "email":
            document.getElementById("warnings").classList.add("msg");
            document.getElementById("warnings").classList.remove("msg-active");
            break;
        case "password":
            document.getElementById("warnings").classList.add("msg");
            document.getElementById("warnings").classList.remove("msg-active");
            break;
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", limpiarMensaje);
    input.addEventListener("blur", limpiarMensaje);
})

class Persona {
    constructor(id, nombre, apellido, direccion_1, direccion_2, pais, ciudad, email, contrasenna) {
        this._id = id;
        this._nom = nombre;
        this._appe = apellido;
        this._dir1 = direccion_1;
        this._dir2 = direccion_2;
        this._pais = pais;
        this._ciudad = ciudad;
        this._email = email;
        this._contra = contrasenna;
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