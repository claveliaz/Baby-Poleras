// Funcionalidad móvil mejorada para Baby Poleras

document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa mejorado
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menuCentral = document.getElementById('menu-central');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const body = document.body;

    // Función para abrir el menú
    function openMenu() {
        menuCentral.classList.add('active');
        body.style.overflow = 'hidden'; // Prevenir scroll del body
        hamburgerMenu.classList.add('active');
        
        // Enfoque en el primer enlace del menú para accesibilidad
        const firstLink = menuCentral.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    }

    // Función para cerrar el menú
    function closeMenu() {
        menuCentral.classList.remove('active');
        body.style.overflow = ''; // Restaurar scroll
        hamburgerMenu.classList.remove('active');
    }

    // Event listeners para el menú
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', openMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = menuCentral ? menuCentral.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (menuCentral && menuCentral.classList.contains('active')) {
            if (!menuCentral.contains(event.target) && 
                !hamburgerMenu.contains(event.target) && 
                !closeMenuBtn.contains(event.target)) {
                closeMenu();
            }
        }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menuCentral && menuCentral.classList.contains('active')) {
            closeMenu();
        }
    });

    // Mejoras para el carrito en móviles
    const carritoSection = document.getElementById('carrito');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');

    if (cerrarCarritoBtn) {
        cerrarCarritoBtn.addEventListener('click', function() {
            if (carritoSection) {
                carritoSection.classList.add('hidden');
                body.style.overflow = ''; // Restaurar scroll
            }
        });
    }

    // Mejoras para formularios en móviles
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de éxito
            const submitBtn = contactForm.querySelector('.btn-enviar');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (reemplazar con lógica real)
            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Mejoras para botones de cantidad en móviles
    const cantidadInputs = document.querySelectorAll('#cantidad');
    cantidadInputs.forEach(input => {
        // Prevenir zoom en iOS al hacer focus
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });
        
        input.addEventListener('blur', function() {
            this.style.fontSize = '';
        });
    });

    // Mejoras para imágenes lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Mejoras para scroll suave en móviles
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.premium-bar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mejoras para touch en móviles
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        // Swipe hacia arriba para cerrar menú
        if (diff > swipeThreshold && menuCentral && menuCentral.classList.contains('active')) {
            closeMenu();
        }
    }

    // Mejoras para el selector de orden en móviles
    const ordenSelect = document.getElementById('orden-select');
    if (ordenSelect) {
        ordenSelect.addEventListener('change', function() {
            // Agregar feedback táctil
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Mejoras para botones de productos en móviles
    const productButtons = document.querySelectorAll('.producto-card button, .btn-principal, .btn-mision-valores');
    productButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });

    // Detectar orientación del dispositivo
    function handleOrientation() {
        if (window.innerHeight > window.innerWidth) {
            // Modo portrait
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        } else {
            // Modo landscape
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        }
    }

    window.addEventListener('orientationchange', handleOrientation);
    window.addEventListener('resize', handleOrientation);
    handleOrientation(); // Ejecutar al cargar

    // Mejoras para el footer en móviles
    const footer = document.querySelector('footer');
    if (footer) {
        // Asegurar que el footer esté siempre visible
        const adjustFooter = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const footerHeight = footer.offsetHeight;
            
            if (documentHeight < windowHeight) {
                footer.style.position = 'fixed';
                footer.style.bottom = '0';
                footer.style.width = '100%';
            } else {
                footer.style.position = '';
                footer.style.bottom = '';
                footer.style.width = '';
            }
        };

        window.addEventListener('resize', adjustFooter);
        adjustFooter();
    }

    // Mejoras para el carrito en móviles
    function updateCartForMobile() {
        const cartItems = document.querySelectorAll('.carrito-item');
        const cartTotal = document.querySelector('.carrito-total');
        
        if (cartItems.length === 0) {
            if (carritoSection) {
                carritoSection.innerHTML = `
                    <h2 class="dm-mono">Carrito de Compras</h2>
                    <div class="carrito-vacio">
                        <p>Tu carrito está vacío</p>
                        <button onclick="document.getElementById('carrito').classList.add('hidden')">Continuar Comprando</button>
                    </div>
                `;
            }
        }
    }

    // Ejecutar actualización del carrito
    updateCartForMobile();

    // Mejoras para la accesibilidad en móviles
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #fff';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    console.log('Funcionalidad móvil cargada correctamente');
}); 