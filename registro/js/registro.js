const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const direccion_1 = document.getElementById("dir1");
const direccion_2 = document.getElementById("dir2");
const pais = document.getElementById("pais");
const ciudad = document.getElementById("ciudad");
const email = document.getElementById("email");
const contrasenna = document.getElementById("contra");
const mensaje = document.getElementById("warnings");
const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
var contador = 1;
let arrayPersonas = [];

const campos = {
    nombre: false,
    apellido: false,
    email: false,
    contra: false
}

formulario.addEventListener("reset", e => {
    mensaje.innerHTML = "";
})

function registrar(per) {
    arrayPersonas.push(per);
    localStorage.setItem("Personas", JSON.stringify(arrayPersonas));
}

(() => {
    arrayPersonas = JSON.parse(localStorage.getItem("Personas"));
    if (arrayPersonas === null) {
        arrayPersonas = [];
    }
})();

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

const validarFormulario = (e) => {
    mensaje.innerHTML = "";
    switch (e.target.name) {
        case "nombre":
            val(expresiones.nombre, e.target, e.target.name)
            break;
        case "apellido":
            val(expresiones.nombre, e.target, e.target.name)
            break;
        case "email":
            val(expresiones.correo, e.target, e.target.name)
            break;
        case "contra":
            val(expresiones.password, e.target, e.target.name)
            break;
    }
}

function val(expresion, input, campo) {
    if (!expresion.test(input.value)) {
        document.getElementById(campo).classList.remove("border");
        document.getElementById(campo).classList.add("border-danger");
        document.getElementById(campo).classList.remove("border-success");
        document.getElementById("warnings").classList.remove("msg");
        document.getElementById("warnings").classList.add("msg-active");
        if (campo == 'contra') {
            warnings = `La contraseña no es valida <br>`
            mensaje.innerHTML = warnings;
        } else {
            warnings = `El ${campo} no es valido <br>`
            mensaje.innerHTML = warnings;
        }
        campos[campo] = false;
    } else {
        document.getElementById(campo).classList.remove("border");
        document.getElementById(campo).classList.add("border-success");
        document.getElementById(campo).classList.remove("border-danger");
        document.getElementById("warnings").classList.remove("msg-active");
        document.getElementById("warnings").classList.add("msg");
        mensaje.innerHTML = "";
        campos[campo] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
})

formulario.addEventListener("submit", (e) => {
    let estado = false;
    e.preventDefault();
    if (campos.nombre && campos.apellido && campos.email && campos.contra) {
        if (arrayPersonas.length === 0) {
            var per = new Persona(contador, nombre.value, apellido.value, direccion_1.value, direccion_2.value, pais.value, ciudad.value, email.value, contrasenna.value);
            registrar(per);
            alerta(estado);
        } else {
            arrayPersonas.forEach(element => {
                if (element._email === email.value) {
                    estado = true
                }
            });
            if (!estado) {
                contador = arrayPersonas[arrayPersonas.length - 1]._id + 1;
                var per = new Persona(contador, nombre.value, apellido.value, direccion_1.value, direccion_2.value, pais.value, ciudad.value, email.value, contrasenna.value);
                registrar(per);
                alerta(estado);
            } else {
                alerta(estado);
            }
        }
    }
})

function alerta(estado) {
    document.getElementById("warnings").classList.remove("msg");
    document.getElementById("warnings").classList.add("msg-active");
    if (estado) {
        warnings = `Correo ya registrado <br>`
        mensaje.innerHTML = warnings;
    } else {
        formulario.reset();
        warnings = `Usuario registrado <br>`
        mensaje.innerHTML = warnings;
        setTimeout(() => {
            document.getElementById("warnings").classList.remove("msg-active");
            document.getElementById("warnings").classList.add("msg");
            location.reload();
        }, 2500)
    }
}