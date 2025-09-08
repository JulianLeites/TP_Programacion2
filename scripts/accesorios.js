const contenedor = document.getElementById("productos")
const nombresProductos = JSON.parse(localStorage.getItem("productosNombresGuardados")) || []
productos.filter(prod => prod.categoria === "Accesorios").forEach(prod =>{      //recorre todos los productos de la categoria
    const div = document.createElement('div');
    div.classList.add("carta");

    //forma y contenido de la carta
    div.innerHTML = `
        <a href="productos.html?id=${prod.id}" class="nombre">${prod.nombre}</a>
        <img src="${prod.imagen}" alt="Prod 1" class="imgProdCarta">
        <p class="precio">${prod.precio}</p>
        <div>
            <span class="disminuir">-</span>
            <span class="cantidad">1</span>
            <span class="aumentar">+</span>
        </div>
        <p class="agregar">Agregar</p>
    `;

    contenedor.appendChild(div)
})