const carrito = document.getElementById("carrito")
const menuCarrito = document.getElementById("menuCarrito")
const listaCarrito = document.getElementById("listaCarrito");
let cant = 1;
let contadorProducto = JSON.parse(localStorage.getItem("cantProductos")) || 0

let contenidoLista = JSON.parse(localStorage.getItem("contenido")) || [];
cargarLocalStorage();


 //contador para guardar en orden los productos guardados
    
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
        
        contadorProducto++; //aumenta cada vez que se agrega algo al carrito
        localStorage.setItem("cantProductos", JSON.stringify(contadorProducto))
        const carta = agregar.closest(".carta");
        
        const nombre = carta.querySelector(".nombre").textContent;
        const precio = carta.querySelector(".precio").textContent;
        const cantidad = carta.querySelector(".cantidad").textContent;
        
        const producto = new Carrito(nombre, precio, cantidad);
        
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} + ${producto.cantidad}`;

        contenidoLista.push(li.textContent)
        
        guardarEnLocalStorage("contenido", contenidoLista)
        
        guardarEnLocalStorage("cantProductos", contadorProducto);

        
        listaCarrito.appendChild(li);
        guardarEnLocalStorage("producto" + contadorProducto, producto);
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
//función para guardar cualquier objeto en el localStorage
function guardarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}
function cargarLocalStorage(){
    for(let i = 0; i < contadorProducto; i++){
        const li = document.createElement("li");
        li.textContent = contenidoLista[i]
        listaCarrito.appendChild(li)
    }
}