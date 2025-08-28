const carrito = document.getElementById("carrito")
const menuCarrito = document.getElementById("menuCarrito")
let cant = 1;

function Carrito(nombre, precio, cantidad){
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

carrito.addEventListener('click', () => {
    if(menuCarrito.style.display === 'none' || menuCarrito.style.display === ""){
        menuCarrito.style.display = "block";
    } else {
        menuCarrito.style.display = 'none';
    }
})

document.querySelectorAll(".agregar").forEach(agregar => {
    agregar.addEventListener('click', () => {
        const carta = agregar.closest(".carta");

        const nombre = carta.querySelector(".nombre").textContent;
        const precio = carta.querySelector(".precio").textContent;
        const cantidad = carta.querySelector(".cantidad").textContent;

        const producto = new Carrito(nombre, precio, cantidad);

        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} + ${producto.cantidad}`;

        const listaCarrito = document.getElementById("listaCarrito");
        listaCarrito.appendChild(li);
    })
})

document.querySelectorAll(".aumentar").forEach(aumentar => {
    const carta = aumentar.closest(".carta");
    const cantidad = carta.querySelector(".cantidad");
    cantidad.textContent = cant;
    aumentar.addEventListener('click', () => {
        const carta = aumentar.closest(".carta");
        cantidad.textContent = parseInt(cantidad.textContent)+1;
    })
})

document.querySelectorAll(".disminuir").forEach(disminuir => {
    const carta = disminuir.closest(".carta");
    const cantidad = carta.querySelector(".cantidad");
    cantidad.textContent = cant;
    disminuir.addEventListener('click', () => {
        let valor = parseInt(cantidad.textContent);
        if(valor > 1){
            cantidad.textContent = parseInt(cantidad.textContent)-1;
        }
    })
})