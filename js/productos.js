// Datos centralizados de productos
const PRODUCTOS = [
    {
        id: 1,
        nombre: "Polera Palms Angels",
        precio: 299,
        descripcion: "Polera negra de algodón 100% premium con diseño exclusivo de Palms Angels. Corte regular fit con cuello redondo. Ideal para cualquier ocasión.",
        imagen: "imagenes/Palms Angels.jpeg",
        imagenes: [
            "imagenes/Palms Angels.jpeg",
            "imagenes/S.jpeg",
            "imagenes/LA.jpeg"
        ],
        soldOut: false
    },
    {
        id: 2,
        nombre: "Polera Amiri Essential",
        precio: 299,
        descripcion: "Polera Amiri confeccionada en algodón peinado de alta calidad. Diseño minimalista perfecto para tu día a día.",
        imagen: "imagenes/Amiri.jpeg",
        imagenes: [
            "imagenes/Amiri.jpeg",
            "imagenes/AWAKENINGS.jpeg",
            "imagenes/A.jpeg"
        ],
        soldOut: false
    },
    {
        id: 3,
        nombre: "Playera Básica Azul",
        precio: 270,
        descripcion: "Playera básica de algodón 100% en color azul. Corte regular fit. Cuello redondo. Manga corta.",
        imagen: "imagenes/Palms Angels.jpeg",
        soldOut: true
    },
    {
        id: 4,
        nombre: 'Playera Básica',
        precio: 270.00,
        imagen: 'imagenes/LA.jpeg',
        descripcion: 'Playera oversize color arena, estilo urbano.',
        soldOut: false
    },
    {
        id: 5,
        nombre: 'Playera Básica',
        precio: 270.00,
        imagen: 'imagenes/S.jpeg',
        descripcion: 'Playera negra con estampado exclusivo Baby Poleras.',
        soldOut: false
    },
    {
        id: 6,
        nombre: 'Playera Bordada',
        precio: 270.00,
        imagen: 'imagenes/A.jpeg',
        descripcion: 'Playera blanca con logo bordado en el pecho.',
        soldOut: false
    }
];

// Exportar los productos para que otros scripts puedan usarlos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTOS };
} else {
    window.PRODUCTOS = PRODUCTOS;
} 