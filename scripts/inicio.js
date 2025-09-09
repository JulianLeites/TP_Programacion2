//cargar cartas
const contenedor = document.getElementById("productos")
const nombresProductos = JSON.parse(localStorage.getItem("productosNombresGuardados")) || []
const cantidadesGuardadas = JSON.parse(localStorage.getItem("cantidadesProductos")) || []
productos.slice(0, 2).forEach(prod =>{      //recorre todos los productos, pero con slide solo hasta el 2
    const div = document.createElement('div');
    div.classList.add("carta");

    //forma y contenido de la carta
    div.innerHTML = `
        <a href="productos.html?id=${prod.id}" class="nombre">${prod.nombre}</a>
        <img src="" alt="Prod 1">
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

const carrito = document.getElementById("carrito")
const menuCarrito = document.getElementById("menuCarrito")
const listaCarrito = document.getElementById("listaCarrito");
let cant = 1;
let contadorProducto = JSON.parse(localStorage.getItem("cantProductos")) || 0
 //contador para guardar en orden los productos guardados
const contenidoLista = JSON.parse(localStorage.getItem("contenido")) || [];
cargarLocalStorage();



    
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
        
        localStorage.setItem("cantProductos", JSON.stringify(contadorProducto));
        const carta = agregar.closest(".carta");
        
        const nombre = carta.querySelector(".nombre").textContent;
        const precio = carta.querySelector(".precio").textContent;
        const cantidad = parseInt(carta.querySelector(".cantidad").textContent.trim());

        const producto = new Carrito(nombre, precio, cantidad);
        
        // Si el producto ya está en el carrito
        if (nombresProductos.includes(nombre)) {
            // Encontrar el índice del producto repetido
            const index = nombresProductos.findIndex(elemento => elemento === nombre);

            // Buscar el li correspondiente en el DOM
            const li = listaCarrito.children[index];
            const span = document.createElement("span")
            span.textContent = `X`
            span.classList.add("eliminarProducto")
            // Sumar la nueva cantidad al valor ya guardado
            const nuevaCantidad = cantidadesGuardadas[index] + cantidad;  

            // Actualizar la cantidad en el arreglo
            cantidadesGuardadas[index] = nuevaCantidad;
            localStorage.setItem("cantidadesProductos", JSON.stringify(cantidadesGuardadas))
            // Actualizar el contenido del li con la nueva cantidad
            li.textContent = `${producto.nombre} - $${producto.precio} + ${nuevaCantidad}`;
            
            
            contenidoLista[index] = li.textContent
            li.insertBefore(span, li.firstChild);
            localStorage.setItem("contenido", JSON.stringify(contenidoLista))
          
            // Actualizar la cantidad del producto en localStorage
            localStorage.setItem("producto" + index, JSON.stringify(producto));

        } else {
            // Si el producto no está repetido, lo agregamos como nuevo
            contadorProducto++; // Aumenta cada vez que se agrega algo al carrito
            nombresProductos.push(nombre);
            cantidadesGuardadas.push(cantidad);  // Guardamos la cantidad de este nuevo producto
            localStorage.setItem("productosNombresGuardados", JSON.stringify(nombresProductos));
            
            const li = document.createElement("li");
            const span = document.createElement("span")
            span.textContent = `X`
            span.classList.add("eliminarProducto")

            li.textContent = `${producto.nombre} - $${producto.precio} + ${producto.cantidad}`;
            contenidoLista.push(li.textContent);
            li.insertBefore(span, li.firstChild)
            // Guardar el nuevo contenido de la lista en localStorage
            
            guardarEnLocalStorage("contenido", contenidoLista);

            // Añadir el nuevo li a la lista del carrito
            listaCarrito.appendChild(li);
        }

        // Actualizar la cantidad de productos en el carrito
        guardarEnLocalStorage("cantProductos", contadorProducto);
    });

});

listaCarrito.addEventListener('click', function(e) {
    if (e.target.classList.contains('eliminarProducto')) {
        const li = e.target.closest("li");
        if (li) {

            // Obtener todos los <li> hermanos (los hijos de la lista)
            const listaItems = Array.from(listaCarrito.children);

            // Buscar el índice del <li> clicado
            const index = listaItems.indexOf(li);
            // Eliminar de arrays
            contenidoLista.splice(index, 1);
            cantidadesGuardadas.splice(index, 1);
            nombresProductos.splice(index, 1);

            // Guardar en localStorage
            guardarEnLocalStorage("contenido", contenidoLista);
            guardarEnLocalStorage("cantidadesProductos", cantidadesGuardadas);
            guardarEnLocalStorage("productosNombresGuardados", nombresProductos);

            // Eliminar el li visual
            li.remove();

            // Actualizar contador y guardarlo
            contadorProducto--;
            guardarEnLocalStorage("cantProductos", contadorProducto);

            alert("Producto eliminado correctamente");
        }
    }
});


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
        const span = document.createElement("span")
        span.textContent = `X`
        span.classList.add("eliminarProducto")
        li.textContent = contenidoLista[i]
      
        li.insertBefore(span, li.firstChild)
        listaCarrito.appendChild(li)
    }
}


