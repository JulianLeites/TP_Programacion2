// Pagina Productos Individuales

const infoProducto = document.getElementById("infoProductos")

productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add("producto");

    div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <span> $${producto.precio}</span>
    `;

    infoProducto.appendChild(div)
});