const perfil = document.getElementById("botonPerfil")
const inicioSesion = document.getElementById("inicioSesion")
const botonCambio = document.getElementById("botonCambio")
const registrar = document.getElementById("registrar")
const cerrarReg = document.getElementById("cerrarReg")
const cerrarIni = document.getElementById("cerrarIni")
const overlay = document.getElementById("overlay")

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
        incioFallido.style.display = 'none'
        overlay.style.display = "block";
    } else {
        inicioSesion.style.display = "none";
        overlay.style.display = "none";
        
        
    }
})

cerrarIni.addEventListener('click', () => {
    formularioInicioSesion.reset()
    if(inicioSesion.style.display === 'none' || inicioSesion.style.display === ""){
        inicioSesion.style.display = "block";
        overlay.style.display = "block";
    } else {
        inicioSesion.style.display = 'none';
        overlay.style.display = "none";
    }
})

cerrarReg.addEventListener('click', () => {
    formularioRegistro.reset()
    mensajeError.style.display = 'none'
    if(registrar.style.display === 'none' || registrar.style.display === ""){
        registrar.style.display = "block";
    } else {
        registrar.style.display = 'none';
        overlay.style.display = "none";
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

const mensajeError = document.getElementById("mensajeError")
const incioFallido = document.getElementById("inicioFallido")
const nombre = document.getElementById("nombreCuenta")
const apellido = document.getElementById("apellidoCuenta")
const usuario = document.getElementById("usuarioCuenta")
const contraseña = document.getElementById("password")
const confPass = document.getElementById("confPass")
const email = document.getElementById("email")
const confEmail = document.getElementById("confEmail")
const terms = document.getElementById("termsConds")
//para mostrar mensaje de error
let bandera = 0;
//mensajes
incioFallido.style.color = 'red'
incioFallido.textContent = `usuario o contraseña incorrectos`
incioFallido.style.display = 'none'
mensajeError.style.display = 'none'
function cargarMensaje(){
    mensajeError.style.color = 'red'
    mensajeError.textContent = `verifique que los campos esten confirmados correctamente, los nombres y apellidos sólo deben contener letras, asegurese de aceptar los términos y condiciones`
    if(bandera === 1){
    mensajeError.style.display = 'block'
    }   
    else{
    mensajeError.style.display = 'none'
    }   
}

cargarMensaje()
//para submit de registro
formularioRegistro.addEventListener("submit", function(evento) {
    
    if(bandera != 0){
        evento.preventDefault()
    }
    else if(!terms.checked){
        evento.preventDefault();
        mensajeError.textContent = `debes aceptar los términos y condiciones`
        mensajeError.style.display = 'block'
    }
    else{
        evento.preventDefault()
        cargarMensaje()
        usuariosGuardados.push(usuario.value)
        contraseñasGuardadas.push(contraseña.value)
        emailsGuardados.push(email.value)
        nombresGuardados.push(nombre.value)
        apellidosGuardados.push(apellido.value)

        
        localStorage.setItem("nombreCuentas", JSON.stringify(nombresGuardados))
        localStorage.setItem("apellidoCuentas", JSON.stringify(apellidosGuardados))
        localStorage.setItem("usuarioCuentas", JSON.stringify(usuariosGuardados))
        localStorage.setItem("passwords", JSON.stringify(contraseñasGuardadas))
        localStorage.setItem("emails", JSON.stringify(emailsGuardados))
        
        formularioRegistro.reset()
        let overlay = document.getElementById("overlay")
        overlay.style.display = 'none'
        alert("registro exitoso")
        document.getElementById("registrar").style.display = "none";
        
    }
})
formularioRegistro.addEventListener('input', ()=>{
    let valorNombre = nombre.value.trim().match(/\d+/g)
    let valorApellido = apellido.value.trim().match(/\d+/g)
    if(valorApellido === null && valorNombre === null && confEmail.value.trim() === email.value.trim() && confPass.value.trim() === contraseña.value.trim()){
        bandera = 0
    }
    else{
        bandera = 1
    }
    cargarMensaje()
})
//para submit de inicio de sesión
formularioInicioSesion.addEventListener("submit", function(evento){
    evento.preventDefault();
    let bandera2 = 0 //para ver si encontró los datos o no
    const usuarioIngresado = document.getElementById("usuarioIngresado").value
    const passIngresada = document.getElementById("passIngresada").value
    usuariosGuardados.forEach(function(cuenta, index){
        if(usuarioIngresado === usuariosGuardados[index] && passIngresada === contraseñasGuardadas[index]){
            alert("inicio de sesión exitoso")
            formularioInicioSesion.reset()
            let overlay = document.getElementById("overlay")
            overlay.style.display = 'none'
            inicioSesion.style.display = 'none'
            bandera2 = 1
        }
       
    })
    if(bandera2 === 0){
        incioFallido.style.display = 'block'
        formularioInicioSesion.reset()
        bandera2 = 0
    }
})

