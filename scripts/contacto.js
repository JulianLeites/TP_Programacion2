document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evitar que recargue

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const consulta = document.getElementById("consulta").value.trim();

    // Validación de campos vacíos
    if (!nombre || !apellido || !telefono || !email || !consulta) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Validación de teléfono (solo números)
    if (!/^[0-9]{7,15}$/.test(telefono)) {
      alert("El teléfono debe contener solo números (7 a 15 dígitos).");
      return;
    }

    // Validación de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      alert("Por favor ingrese un email válido.");
      return;
    }

    // Si todo está bien
    alert(`Gracias ${nombre} ${apellido}, recibimos tu consulta. Nos comunicaremos al ${telefono} o a tu email: ${email}.`);
    form.reset();
  });
});
