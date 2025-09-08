// Pagina Productos Individuales

//buscar la id en la url
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"))

const producto = productos.find(p => p.id === id);

const contenedor = document.getElementById("infoProducto");

if(producto) {
    contenedor.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span> $${producto.precio}</span>
    `;
} else{
    contenedor.innerHTML = "<p>Producto No Encontrado</p>"
}

// const infoProducto = document.getElementById("infoProductos")

// productos.forEach(producto => {
//     const div = document.createElement('div');
//     div.classList.add("producto");

//     div.innerHTML = `
//     <h3>${producto.nombre}</h3>
//     <p>${producto.descripcion}</p>
//     <span> $${producto.precio}</span>
//     `;

//     infoProducto.appendChild(div)
// });