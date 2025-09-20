// Pagina Productos Individuales

//buscar la id en la url
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"))

const producto = productos.find(p => p.id === id);

const contenedor = document.getElementById("infoProducto");
const imagen = document.getElementById("imagenesProducto");

if(producto) {
    contenedor.innerHTML = `
        <h3>${producto.nombre}</h3>
        <span class="precio"> $${producto.precio}</span>
        <p class="descripcion">${producto.descripcion}</p>
    `;
    imagen.innerHTML = `
        <img src="${producto.imagen}" class="imgProdInd">
    `;
} else{
    contenedor.innerHTML = "<p>Producto No Encontrado</p>"
}

const botonAgregar = document.getElementById("agregarProducto")
const carrito = document.getElementById("carrito")
const menuCarrito = document.getElementById("menuCarrito")
const listaCarrito = document.getElementById("listaCarrito");
const cantidadesGuardadas = JSON.parse(localStorage.getItem("cantidadesProductos")) || []
const nombresProductos = JSON.parse(localStorage.getItem("productosNombresGuardados")) || []
const preciosGuardados =  JSON.parse(localStorage.getItem("preciosGuardados")) || []
const contenidoLista = JSON.parse(localStorage.getItem("contenido")) || []
let contadorProducto = JSON.parse(localStorage.getItem("cantProductos")) || 0
let banderaCompra = 0;
const totalCarrito = document.getElementById("total")
const ulCompraTotal = document.getElementById("listaFuncion")
cargarLocalStorage()
botonAgregar.addEventListener('click', () =>{
        // Si el producto ya está en el carrito
 
        if (nombresProductos.includes(producto.nombre)) {
            // Encontrar el índice del producto repetido
            const index = nombresProductos.findIndex(elemento => elemento === producto.nombre);
            // Buscar el li correspondiente en el DOM
            const li = listaCarrito.children[index];
            const span = document.createElement("span")
            span.textContent = `X`
            span.classList.add("eliminarProducto")
            // Sumar la nueva cantidad al valor ya guardado
            const nuevaCantidad = cantidadesGuardadas[index] + 1;  

            // Actualizar la cantidad en el arreglo
            cantidadesGuardadas[index] = nuevaCantidad;
            localStorage.setItem("cantidadesProductos", JSON.stringify(cantidadesGuardadas))
            // Actualizar el contenido del li con la nueva cantidad
            li.textContent = `${producto.nombre} - ${producto.precio} x ${nuevaCantidad}`;
            
            preciosGuardados[index] = producto.precio * nuevaCantidad
            localStorage.setItem("preciosGuardados", JSON.stringify(preciosGuardados))
            contenidoLista[index] = li.textContent
            li.insertBefore(span, li.firstChild);
            localStorage.setItem("contenido", JSON.stringify(contenidoLista))
            
          

        } else {
            // Si el producto no está repetido, lo agregamos como nuevo
            contadorProducto++; // Aumenta cada vez que se agrega algo al carrito
            nombresProductos.push(producto.nombre);
            cantidadesGuardadas.push(1);  // Guardamos la cantidad de este nuevo producto
            preciosGuardados.push(producto.precio * 1)
            localStorage.setItem("preciosGuardados", JSON.stringify(preciosGuardados))
            localStorage.setItem("productosNombresGuardados", JSON.stringify(nombresProductos));
            localStorage.setItem("cantidadesProductos", JSON.stringify(cantidadesGuardadas))
            
            const li = document.createElement("li");
            const span = document.createElement("span")
            span.textContent = `X`
            span.classList.add("eliminarProducto")

            li.textContent = `${producto.nombre} - ${producto.precio} x 1`;
            contenidoLista.push(li.textContent);
            li.insertBefore(span, li.firstChild)
            // Guardar el nuevo contenido de la lista en localStorage
            
            guardarEnLocalStorage("contenido", contenidoLista);

            // Añadir el nuevo li a la lista del carrito
            listaCarrito.appendChild(li);
        }
        
        // Actualizar la cantidad de productos en el carrito
        guardarEnLocalStorage("cantProductos", contadorProducto);
        
        calcularTotal()
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
            preciosGuardados.splice(index, 1)
            // Guardar en localStorage
            guardarEnLocalStorage("contenido", contenidoLista);
            guardarEnLocalStorage("cantidadesProductos", cantidadesGuardadas);
            guardarEnLocalStorage("productosNombresGuardados", nombresProductos);
            guardarEnLocalStorage("preciosGuardados", preciosGuardados)

            // Eliminar el li visual
            li.remove();

            // Actualizar contador y guardarlo
            contadorProducto--;
            guardarEnLocalStorage("cantProductos", contadorProducto);

        }
    }
    calcularTotal()
});
function guardarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}
function cargarLocalStorage(){
    listaCarrito.innerHTML = ``
    for(let i = 0; i < contadorProducto; i++){
        const li = document.createElement("li");
        const span = document.createElement("span")
        span.textContent = `X`
        span.classList.add("eliminarProducto")
        li.textContent = contenidoLista[i]
      
        li.insertBefore(span, li.firstChild)
        listaCarrito.appendChild(li)

    }
    calcularTotal()
}
function calcularTotal(){
    let acumuladorTotal = 0
    
    preciosGuardados.forEach((totalProducto) =>{
        acumuladorTotal = acumuladorTotal + totalProducto
    })
    if(acumuladorTotal === 0){
        totalCarrito.textContent = `Aún no hay productos en el carrito`
    }
    else{
        totalCarrito.textContent = `Total: $${acumuladorTotal}`
        if(banderaCompra === 0){
            const li = document.createElement("li")
            li.textContent = `Comprar`
            li.id = 'comprar'
            ulCompraTotal.appendChild(li)
            banderaCompra = 1
            document.getElementById("comprar").addEventListener('click', () =>{ 
                //eliminar visualmebte
                listaCarrito.innerHTML = ``

                // Eliminar de arrays
                contenidoLista.splice(0, contenidoLista.length)
                cantidadesGuardadas.splice(0, cantidadesGuardadas.length)
                nombresProductos.splice(0, nombresProductos.length)
                preciosGuardados.splice(0, preciosGuardados.length)
                //eliminar los productos distintos
                contadorProducto = 0
                // Guardar en localStorage
                guardarEnLocalStorage("cantProductos", contadorProducto)
                guardarEnLocalStorage("contenido", contenidoLista);
                guardarEnLocalStorage("cantidadesProductos", cantidadesGuardadas);
                guardarEnLocalStorage("productosNombresGuardados", nombresProductos);
                guardarEnLocalStorage("preciosGuardados", preciosGuardados)

                // Eliminar el botón de compra
                li.remove();

                // Actualizar contador y guardarlo
                contadorProducto = 0;
                guardarEnLocalStorage("cantProductos", contadorProducto);
                //volver a mostrar el mensaje "Aún no hay productos en el carrito"
                calcularTotal()
                banderaCompra = 0 //el botón de compra puede volver a aparecer luego de haberse eliminado
                
            })
        }   
    }
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

/*
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
            localStorage.setItem("cantidadesProductos", JSON.stringify(cantidadesGuardadas))
            
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
*/