document.addEventListener("DOMContentLoaded", () => {
  const botonDark = document.getElementById("botonDark");

  botonDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Cambiar texto/icono del botón
    if (document.body.classList.contains("dark-mode")) {
      botonDark.textContent = "☀️ Modo Claro";
    } else {
      botonDark.textContent = "🌙 Modo Oscuro";
    }
  });
});
