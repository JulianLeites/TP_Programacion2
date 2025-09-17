document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");

  // Definimos los campos a validar
  const campos = {
    nombre: { el: document.getElementById("nombre"), regex: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, msg: "Solo letras y espacios" },
    apellido: { el: document.getElementById("apellido"), regex: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, msg: "Solo letras y espacios" },
    telefono: { el: document.getElementById("telefono"), regex: /^[0-9]{7,15}$/, msg: "El teléfono debe tener entre 7 y 15 números" },
    email: { el: document.getElementById("email"), regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: "Email inválido" },
    motivo: { el: document.getElementById("motivo"), regex: /.+/, msg: "Seleccione un motivo" },
    consulta: { el: document.getElementById("consulta"), regex: /^.{15,300}$/, msg: "La consulta debe tener entre 15 y 300 caracteres" },
  };

  // Mostrar mensaje de error debajo del campo
  function mostrarError(input, mensaje) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-msg")) {
      error = document.createElement("div");
      error.className = "error-msg";
      error.style.color = "red";
      error.style.fontSize = "0.8em";
      error.style.marginTop = "2px";
      input.insertAdjacentElement("afterend", error);
    }
    error.textContent = mensaje;
    input.style.border = "2px solid red";
  }

  function limpiarError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-msg")) {
      error.textContent = "";
    }
    input.style.border = "2px solid green";
  }

  // Validar campo
  function validarCampo(campo) {
    const valor = campo.el.value.trim();
    if (!campo.regex.test(valor)) {
      mostrarError(campo.el, campo.msg);
      return false;
    } else {
      limpiarError(campo.el);
      return true;
    }
  }

  // Validación en tiempo real
  Object.values(campos).forEach(campo => {
    const evento = campo.el.tagName === "SELECT" ? "change" : "input";
    campo.el.addEventListener(evento, () => validarCampo(campo));
  });

  // Validación al enviar
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoValido = true;

    Object.values(campos).forEach(campo => {
      if (!validarCampo(campo)) todoValido = false;
    });

    if (!todoValido) {
      alert("Corrija los errores antes de enviar el formulario.");
      return;
    }

    alert(`Gracias ${campos.nombre.el.value} ${campos.apellido.el.value}, recibimos tu consulta.`);
    form.reset();
    Object.values(campos).forEach(campo => campo.el.style.border = "");
    document.querySelectorAll(".error-msg").forEach(e => e.remove());
  });
});
