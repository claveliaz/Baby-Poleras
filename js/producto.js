document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto de la URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // Encontrar el producto en el array de productos
    const producto = productos.find(p => p.id === parseInt(productId));

    if (producto) {
        // Actualizar la información del producto
        document.getElementById('imagen-principal').src = producto.imagen;
        document.getElementById('producto-nombre').textContent = producto.nombre;
        document.getElementById('producto-precio').textContent = `$${producto.precio} MXN`;
        document.getElementById('producto-descripcion').textContent = producto.descripcion;
        document.title = `${producto.nombre} | Baby Poleras`;
    } else {
        // Redirigir a la página principal si no se encuentra el producto
        window.location.href = 'index.html';
    }

    // Manejar la cantidad
    const cantidadInput = document.getElementById('cantidad');
    const decrementarBtn = document.getElementById('decrementar');
    const incrementarBtn = document.getElementById('incrementar');

    decrementarBtn.addEventListener('click', () => {
        const currentValue = parseInt(cantidadInput.value);
        if (currentValue > 1) {
            cantidadInput.value = currentValue - 1;
        }
    });

    incrementarBtn.addEventListener('click', () => {
        const currentValue = parseInt(cantidadInput.value);
        if (currentValue < 10) {
            cantidadInput.value = currentValue + 1;
        }
    });

    // Manejar el carrito
    const agregarCarritoBtn = document.getElementById('agregar-carrito');
    
    agregarCarritoBtn.addEventListener('click', () => {
        if (producto) {
            const cantidad = parseInt(cantidadInput.value);
            const item = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            };

            // Obtener el carrito actual del localStorage
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
            // Buscar si el producto ya está en el carrito
            const itemIndex = carrito.findIndex(i => i.id === item.id);
            
            if (itemIndex > -1) {
                // Actualizar cantidad si ya existe
                carrito[itemIndex].cantidad += cantidad;
                if (carrito[itemIndex].cantidad > 10) {
                    carrito[itemIndex].cantidad = 10;
                }
            } else {
                // Agregar nuevo item si no existe
                carrito.push(item);
            }

            // Guardar el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));
            
            // Actualizar el contador del carrito
            actualizarContadorCarrito();

            // Mostrar mensaje de éxito
            mostrarMensaje('Producto agregado al carrito');
        }
    });
});

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cart-count').textContent = total;
}

// Función para mostrar mensaje
function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-flotante';
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);

    // Eliminar el mensaje después de 2 segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 2000);
}

// Actualizar el contador del carrito al cargar la página
actualizarContadorCarrito(); 