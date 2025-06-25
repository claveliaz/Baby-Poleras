// Lógica unificada para index.html y comprar.html

document.addEventListener('DOMContentLoaded', () => {
  // Mover la inicialización de elementos del DOM aquí
  const productosGrid = document.getElementById('productos-grid');
  const ordenSelect = document.querySelector('.orden-select');
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  const carritoSection = document.getElementById('carrito');
  const carritoItems = document.getElementById('carrito-items');
  const carritoTotal = document.getElementById('carrito-total');
  const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
  const menuCentral = document.getElementById('menu-central');
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const closeMenuBtn = document.getElementById('close-menu-btn');

  // Lógica del menú hamburguesa
  if (hamburgerMenu && menuCentral && closeMenuBtn) {
    hamburgerMenu.addEventListener('click', () => {
      menuCentral.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
    });

    closeMenuBtn.addEventListener('click', () => {
      menuCentral.classList.remove('active');
      hamburgerMenu.classList.remove('active');
    });
  }

  // Renderizar productos en páginas que lo necesiten
  if (productosGrid) {
    renderProductos(PRODUCTOS);
  }

  // Lógica del carrito de compras (debe estar después de la del menú)
  const carritoContainer = document.getElementById('carrito-container');
  const carritoLista = document.getElementById('carrito-lista');
  
  // FUNCIONES UNIFICADAS DEL CARRITO - SIEMPRE USAN LOCALSTORAGE
  
  // Función para obtener el carrito actual desde localStorage
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }
  
  // Función para guardar el carrito en localStorage
  function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  // Función para actualizar el contador del carrito
  function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.style.visibility = totalItems > 0 ? 'visible' : 'hidden';
    }
  }
  
  // Función para agregar producto al carrito
  window.agregarAlCarrito = function(producto, cantidad) {
    const carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
      if (itemExistente.cantidad > 10) {
        itemExistente.cantidad = 10;
      }
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: cantidad
      });
    }
    
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    mostrarMensajeExito();
  };
  
  // Función para eliminar producto del carrito
  window.eliminarDelCarrito = function(id) {
    const carrito = obtenerCarrito();
    const carritoActualizado = carrito.filter(item => item.id !== id);
    guardarCarrito(carritoActualizado);
    actualizarContadorCarrito();
    
    // Actualizar renderizado si estamos en página de carrito
    if (document.querySelector('.carrito-page')) {
      renderizarDetalleCarrito();
    } else if (carritoItems) {
      renderCarrito();
    }
  };
  
  // Función para actualizar cantidad en el carrito
  window.actualizarCantidadCarrito = function(id, nuevaCantidad) {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }
    if (nuevaCantidad > 10) return;

    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id);
    if (item) {
      item.cantidad = nuevaCantidad;
      guardarCarrito(carrito);
      actualizarContadorCarrito();
      
      // Actualizar renderizado si estamos en página de carrito
      if (document.querySelector('.carrito-page')) {
        renderizarDetalleCarrito();
      } else if (carritoItems) {
        renderCarrito();
      }
    }
  };

  // Renderizar productos (todos o solo algunos)
  function renderProductos(productos) {
    if (!productosGrid) return;
    productosGrid.innerHTML = '';
    productos.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'producto-card';
      card.onclick = () => navegarAProducto(producto.id);
      
      // Imagen con overlay SOLD OUT si aplica
      const imgWrap = document.createElement('div');
      imgWrap.className = 'producto-card-img-wrap';
      const img = document.createElement('img');
      img.src = `assets/${producto.imagen}`;
      img.alt = producto.nombre;
      img.loading = 'lazy';
      imgWrap.appendChild(img);
      if (producto.soldOut) {
        const sold = document.createElement('div');
        sold.className = 'sold-out';
        sold.textContent = 'SOLD OUT';
        imgWrap.appendChild(sold);
      }
      card.appendChild(imgWrap);
      
      // Nombre
      const nombre = document.createElement('h3');
      nombre.textContent = producto.nombre;
      nombre.className = 'neue-plank-bold';
      card.appendChild(nombre);
      
      // Precio
      const precio = document.createElement('p');
      precio.textContent = `$${producto.precio.toLocaleString('es-MX')} MXN`;
      precio.className = 'neue-plank-bold';
      card.appendChild(precio);
      
      productosGrid.appendChild(card);
    });
  }

  // Navegación a página de producto
  function navegarAProducto(id) {
    window.location.href = `producto.html?id=${id}`;
  }

  // Lógica específica para la página de producto
  function inicializarPaginaProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const producto = PRODUCTOS.find(p => p.id === id);
    
    if (!producto) {
      window.location.href = 'index.html';
      return;
    }

    // Actualizar elementos del DOM
    document.getElementById('producto-img-main').src = `assets/${producto.imagen}`;
    document.getElementById('producto-nombre').textContent = producto.nombre;
    document.getElementById('producto-precio').textContent = `$${producto.precio.toLocaleString('es-MX')} MXN`;
    
    // Configurar miniaturas
    const miniaturas = document.getElementById('producto-miniaturas');
    if (miniaturas) {
      // Agregar la imagen principal como primera miniatura
      const miniatura = document.createElement('div');
      miniatura.className = 'producto-miniatura active';
      miniatura.innerHTML = `<img src="assets/${producto.imagen}" alt="${producto.nombre}" loading="lazy">`;
      miniatura.onclick = () => cambiarImagenPrincipal(`assets/${producto.imagen}`);
      miniaturas.appendChild(miniatura);
    }

    // Configurar botón de agregar al carrito
    const btnAgregar = document.getElementById('btn-agregar');
    if (btnAgregar) {
      if (producto.soldOut) {
        btnAgregar.textContent = 'SOLD OUT';
        btnAgregar.disabled = true;
        btnAgregar.classList.add('sold-out');
      } else {
        btnAgregar.onclick = () => {
          const cantidad = parseInt(document.getElementById('cantidad').value);
          agregarAlCarrito(producto, cantidad);
          mostrarMensajeExito();
        };
      }
    }

    // Verificar si el producto ya está en el carrito y actualizar cantidad
    const carrito = obtenerCarrito();
    const itemEnCarrito = carrito.find(item => item.id === id);
    if (itemEnCarrito) {
      document.getElementById('cantidad').value = itemEnCarrito.cantidad;
    }
  }

  // Funciones para el contador de cantidad
  window.incrementarCantidad = function() {
    const input = document.getElementById('cantidad');
    const valor = parseInt(input.value);
    if (valor < 10) input.value = valor + 1;
  }

  window.decrementarCantidad = function() {
    const input = document.getElementById('cantidad');
    const valor = parseInt(input.value);
    if (valor > 1) input.value = valor - 1;
  }

  // Cambiar imagen principal
  function cambiarImagenPrincipal(src) {
    const imgPrincipal = document.getElementById('producto-img-main');
    if (imgPrincipal) imgPrincipal.src = src;
    
    // Actualizar estado activo de miniaturas
    const miniaturas = document.querySelectorAll('.producto-miniatura');
    miniaturas.forEach(min => {
      if (min.querySelector('img').src === src) {
        min.classList.add('active');
      } else {
        min.classList.remove('active');
      }
    });
  }

  // Ordenar productos
  function ordenarProductos(criterio) {
    let productosOrdenados = [...PRODUCTOS];
    switch(criterio) {
      case 'precio-bajo':
        productosOrdenados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-alto':
        productosOrdenados.sort((a, b) => b.precio - a.precio);
        break;
      case 'nuevos':
        productosOrdenados.reverse();
        break;
      default:
        break;
    }
    renderProductos(productosOrdenados);
  }

  // Función unificada para renderizar el carrito (popup)
  function renderCarrito() {
    if (!carritoItems) return;
    
    const carrito = obtenerCarrito();
    carritoItems.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
      carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
      if (carritoTotal) carritoTotal.textContent = '0.00';
      return;
    }

    carrito.forEach(item => {
      total += item.precio * item.cantidad;
      const div = document.createElement('div');
      div.className = 'carrito-item';
      div.innerHTML = `
        <div class="carrito-item-info">
          <img src="assets/${item.imagen}" alt="${item.nombre}" loading="lazy">
          <div class="carrito-item-detalles">
            <h3 class="dm-mono">${item.nombre}</h3>
            <p class="dm-mono">$${item.precio.toLocaleString('es-MX')} MXN</p>
            <div class="carrito-item-cantidad">
              <button onclick="actualizarCantidadCarrito(${item.id}, ${item.cantidad - 1})">-</button>
              <span>${item.cantidad}</span>
              <button onclick="actualizarCantidadCarrito(${item.id}, ${item.cantidad + 1})">+</button>
            </div>
          </div>
        </div>
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">×</button>
      `;
      carritoItems.appendChild(div);
    });

    if (carritoTotal) {
      carritoTotal.textContent = total.toLocaleString('es-MX');
    }
  }

  // Función para renderizar el carrito detallado (página de carrito)
  function renderizarDetalleCarrito() {
    const itemsContainer = document.getElementById('carrito-detalle-items');
    const subtotalElem = document.getElementById('carrito-subtotal');
    const totalElem = document.getElementById('carrito-total-final');
    const finalizarBtn = document.getElementById('finalizar-compra');

    if (!itemsContainer) return;

    const carrito = obtenerCarrito();
    itemsContainer.innerHTML = '';
    
    if (carrito.length === 0) {
      itemsContainer.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío. <a href="tienda.html">Ir a la tienda</a>.</p>';
      if (finalizarBtn) finalizarBtn.disabled = true;
      actualizarTotales(0);
      return;
    }

    let subtotal = 0;
    carrito.forEach(item => {
      subtotal += item.precio * item.cantidad;
      const itemHTML = `
        <div class="carrito-detalle-item">
          <img src="assets/${item.imagen}" alt="${item.nombre}" loading="lazy">
          <div class="item-info">
            <h3 class="dm-mono">${item.nombre}</h3>
            <p class="neue-plank">$${item.precio.toLocaleString('es-MX')} MXN</p>
            <div class="cantidad-control">
              <button onclick="actualizarCantidadCarrito(${item.id}, ${item.cantidad - 1})">-</button>
              <input type="number" value="${item.cantidad}" readonly>
              <button onclick="actualizarCantidadCarrito(${item.id}, ${item.cantidad + 1})">+</button>
            </div>
          </div>
          <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">×</button>
        </div>
      `;
      itemsContainer.innerHTML += itemHTML;
    });

    actualizarTotales(subtotal);
    if (finalizarBtn) finalizarBtn.disabled = false;
  }

  function actualizarTotales(subtotal) {
    const total = subtotal; // Envío es gratis por ahora
    const subtotalElem = document.getElementById('carrito-subtotal');
    const totalElem = document.getElementById('carrito-total-final');
    
    if (subtotalElem) subtotalElem.textContent = `$${subtotal.toLocaleString('es-MX')}`;
    if (totalElem) totalElem.textContent = `$${total.toLocaleString('es-MX')}`;
  }

  // Mostrar mensaje temporal
  function mostrarMensaje(texto) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-flotante';
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
      mensaje.classList.add('mostrar');
      setTimeout(() => {
        mensaje.classList.remove('mostrar');
        setTimeout(() => mensaje.remove(), 300);
      }, 2000);
    }, 100);
  }

  // Función para mostrar mensaje de éxito
  function mostrarMensajeExito() {
    mostrarMensaje('¡Producto agregado al carrito!');
  }

  // Event Listeners
  if (ordenSelect) {
    ordenSelect.addEventListener('change', (e) => {
      ordenarProductos(e.target.value);
    });
  }
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      if (carritoSection) {
        carritoSection.classList.remove('hidden');
        renderCarrito(); // Renderizar carrito actualizado al abrir
      }
    });
  }
  if (cerrarCarritoBtn) {
    cerrarCarritoBtn.addEventListener('click', () => {
      if (carritoSection) carritoSection.classList.add('hidden');
    });
  }

  // --- Lógica para la página de Carrito Detallado ---
  function inicializarPaginaCarrito() {
    const finalizarBtn = document.getElementById('finalizar-compra');

    if (finalizarBtn) {
      finalizarBtn.onclick = () => {
        const carrito = obtenerCarrito();
        if(carrito.length > 0) {
          // Simulación de compra
          localStorage.removeItem('carrito');
          document.body.innerHTML = `
            <div class="mensaje-compra-exitosa">
              <h1 class="dm-mono">¡Gracias por tu compra!</h1>
              <p class="neue-plank">Tu pedido ha sido realizado con éxito.</p>
              <p class="neue-plank">Serás redirigido al inicio en 5 segundos...</p>
            </div>
          `;
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 5000);
        }
      };
    }

    renderizarDetalleCarrito();
  }

  // --- INICIALIZACIÓN GENERAL ---
  // Lógica del menú hamburguesa
  if (hamburgerMenu && menuCentral && closeMenuBtn) {
    hamburgerMenu.addEventListener('click', () => {
      menuCentral.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
    });

    closeMenuBtn.addEventListener('click', () => {
      menuCentral.classList.remove('active');
      hamburgerMenu.classList.remove('active');
    });
  }

  // Lógica común para todas las páginas
  actualizarContadorCarrito();

  // Lógica específica por página
  if (document.querySelector('.productos-grid')) {
    // Para index.html y tienda.html
    const productosAMostrar = document.body.id === 'page-index' ? PRODUCTOS.slice(0, 4) : PRODUCTOS;
    renderProductos(productosAMostrar);
    if(ordenSelect) {
      ordenSelect.addEventListener('change', (e) => ordenarProductos(e.target.value));
    }
  }

  if (document.querySelector('.producto-detalle')) {
    // Para producto.html
    inicializarPaginaProducto();
  }
  
  if (document.querySelector('.carrito-page')) {
    // Para comprar.html (página del carrito)
    inicializarPaginaCarrito();
  }
}); 