const carrito = document.getElementById("carrito")
const menuCarrito = document.getElementById("menuCarrito")

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