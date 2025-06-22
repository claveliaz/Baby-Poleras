// Datos centralizados de productos
const PRODUCTOS = [
    {
        id: 1,
        nombre: "Polera Palms Angels",
        precio: 270,
        descripcion: "Polera Palms Angels de algodón 100% premium con diseño exclusivo de Palms Angels. Corte regular fit con cuello redondo. Ideal para cualquier ocasión.",
        imagen: "imagenes/Palms Angels.jpeg",
        imagenes: [
            "imagenes/Palms Angels.jpeg",
        ],
        soldOut: false
    },
    {
        id: 2,
        nombre: "Polera Amiri Essential",
        precio: 270,
        descripcion: "Polera Amiri confeccionada en algodón peinado de alta calidad. Diseño minimalista perfecto para tu día a día.",
        imagen: "imagenes/Amiri.jpeg",
        imagenes: [
            "imagenes/Amiri.jpeg",
        ],
        soldOut: false
    },
    {
        id: 3,
        nombre: "Polera Awakenings",
        precio: 270,
        descripcion: "Polera Awakenings confeccionada en algodón peinado de alta calidad. Diseño minimalista perfecto para tu día a día.",
        imagen: "imagenes/AWAKENINGS.jpeg",
        imagenes: [
            "imagenes/AWAKENINGS.jpeg",
        ],
        soldOut: false
    },
    {
        id: 4,
        nombre: "Polera LA Azul",
        precio: 270,
        descripcion: "Polera Azulconfeccionada en algodón peinado de alta calidad. Diseño minimalista perfecto para tu día a día.",
        imagen: "imagenes/LA.jpeg",
        imagenes: [
            "imagenes/LA.jpeg",
        ],
        soldOut: false
    },
    {
        id: 5,
        nombre: "Polera Básica ",
        precio: 270,
        descripcion: "Polera Básica confeccionada en algodón peinado de alta calidad. Diseño minimalista perfecto para tu día a día.",
        imagen: "imagenes/S.jpeg",
        imagenes: [
            "imagenes/S.jpeg",
        ],
        soldOut: false
    },
    {
        id: 6,
        nombre: "Polera Básica ",
        precio: 270,
        descripcion: "Polera Básica confeccionada en algodón peinado de alta calidad. Diseño minimalista perfecto para tu día a día.",
        imagen: "imagenes/A.jpeg",
        imagenes: [
            "imagenes/A.jpeg",
        ],
        soldOut: false
    }
];

// Exportar los productos para que otros scripts puedan usarlos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTOS };
} else {
    window.PRODUCTOS = PRODUCTOS;
} 