const perfil = document.getElementById("botonPerfil")
const inicioSesion = document.getElementById("inicioSesion")
const botonCambio = document.getElementById("botonCambio")
const registrar = document.getElementById("registrar")
const cerrarReg = document.getElementById("cerrarReg")
const cerrarIni = document.getElementById("cerrarIni")

document.querySelectorAll(".botonCambio").forEach(boton => {
    boton.addEventListener('click', () => {
        if(inicioSesion.style.display === 'none' || inicioSesion.style.display === ""){
        inicioSesion.style.display = "block";
    } else {
        inicioSesion.style.display = 'none';
    }
    if(registrar.style.display === 'none' || registrar.style.display === ""){
        registrar.style.display = "block";
    } else {
        registrar.style.display = 'none';
    }
    })
})

perfil.addEventListener('click', () => {
    if(inicioSesion.style.display === 'none' || inicioSesion.style.display === ""){
        inicioSesion.style.display = "block";
    } else {
        inicioSesion.style.display = 'none';
    }
})

cerrarIni.addEventListener('click', () => {
    if(inicioSesion.style.display === 'none' || inicioSesion.style.display === ""){
        inicioSesion.style.display = "block";
    } else {
        inicioSesion.style.display = 'none';
    }
})

cerrarReg.addEventListener('click', () => {
    if(registrar.style.display === 'none' || registrar.style.display === ""){
        registrar.style.display = "block";
    } else {
        registrar.style.display = 'none';
    }
})

//inicialización formularios
const formularioInicioSesion = document.getElementById("formInicioSesion")
const formularioRegistro = document.getElementById("formRegistro")
//datos guardados o inicialización de datos
const usuariosGuardados = JSON.parse(localStorage.getItem("usuarioCuentas")) || []
const contraseñasGuardadas = JSON.parse(localStorage.getItem("apellidoCuentas")) || []
const emailsGuardados = JSON.parse(localStorage.getItem("emails")) || []
const nombresGuardados = JSON.parse(localStorage.getItem("nombreCuentas")) || []
const apellidosGuardados = JSON.parse(localStorage.getItem("apellidoCuentas")) || []

//para submit de registro
formularioRegistro.addEventListener("submit", function(evento) {
    evento.preventDefault();
    usuariosGuardados.push(document.getElementById("usuarioCuenta").value)
    contraseñasGuardadas.push(document.getElementById("password").value)
    emailsGuardados.push(document.getElementById("email").value)
    nombresGuardados.push(document.getElementById("nombreCuenta").value)
    apellidosGuardados.push(document.getElementById("apellidoCuenta").value)

    
    localStorage.setItem("nombreCuentas", JSON.stringify(nombresGuardados))
    localStorage.setItem("apellidoCuentas", JSON.stringify(apellidosGuardados))
    localStorage.setItem("usuarioCuentas", JSON.stringify(usuariosGuardados))
    localStorage.setItem("passwords", JSON.stringify(contraseñasGuardadas))
    localStorage.setItem("emails", JSON.stringify(emailsGuardados))
    
    formularioRegistro.reset()
    alert("registro exitoso")
    document.getElementById("registrar").style.display = "none";



})
//para submit de inicio de sesión
formularioInicioSesion.addEventListener("submit", function(evento){
    evento.preventDefault();
    let bandera = 0 //para ver si encontró los datos o no
    const usuarioIngresado = document.getElementById("usuarioIngresado").value
    const passIngresada = document.getElementById("passIngresada").value
    usuariosGuardados.forEach(function(cuenta, index){
        if(usuarioIngresado == usuariosGuardados[index] && passIngresada == contraseñasGuardadas[index]){
            alert("inicio de sesión exitoso")
            formularioInicioSesion.reset()
            document.getElementById("inicioSesion").style.display = "none";
            bandera = 1
        }
       
    })
    if(bandera == 0){
        alert("usuario o contraseña incorrectos")
        formularioInicioSesion.reset()
        bandera = 0
    }
})
