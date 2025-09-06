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