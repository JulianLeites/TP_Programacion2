document.addEventListener("DOMContentLoaded", () => {
  const botonDark = document.getElementById("botonDark");

  // Revisar si el usuario ya tiene una preferencia guardada
  const modoGuardado = localStorage.getItem("modoOscuro");

  if (modoGuardado === "activado") {
    document.body.classList.add("dark-mode");
    botonDark.textContent = "☀️";
    botonDark.style.backgroundColor = "#121212"
  } else {
    botonDark.textContent = "🌙";
    botonDark.style.backgroundColor = "rgb(179, 177, 196)"
  }

  // Cambiar modo
  botonDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      botonDark.textContent = "☀️";
      botonDark.style.backgroundColor = "#121212"
      localStorage.setItem("modoOscuro", "activado");
    } else {
      botonDark.textContent = "🌙";
      botonDark.style.backgroundColor = "rgb(179, 177, 196)"
      localStorage.setItem("modoOscuro", "desactivado");
    }
  });
});

