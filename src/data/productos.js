
import ps5 from "../image/ps5.webp";
import xbox from "../image/xbox.webp";
import teclado from "../image/teclado.webp";
import mouse from "../image/mouse.webp";
import computador from "../image/computador.jpg";
import silla from "../image/silla.jpg";
import carcassonne from "../image/carcassonne.webp";
import poleron from "../image/poleroncyber.png";

const CLAVE = "levelup-productos-v2";

const productosIniciales = [
  {
    id: 1,
    nombre: "PlayStation 5",
    categoria: "Consolas",
    precio: 799990,
    stock: 10,
    imagen: ps5,
    descripcion: "Consola PlayStation 5 para videojuegos."
  },
  {
    id: 2,
    nombre: "Xbox Series X",
    categoria: "Consolas",
    precio: 679990,
    stock: 8,
    imagen: xbox,
    descripcion: "Consola Xbox Series X de Microsoft."
  },
  {
    id: 3,
    nombre: "Teclado Gamer",
    categoria: "Accesorios",
    precio: 39990,
    stock: 20,
    imagen: teclado,
    descripcion: "Teclado para equipos gamer."
  },
  {
    id: 4,
    nombre: "Mouse Gamer",
    categoria: "Accesorios",
    precio: 24990,
    stock: 15,
    imagen: mouse,
    descripcion: "Mouse para juegos de computador."
  },
  {
    id: 5,
    nombre: "Computador Gamer",
    categoria: "Computadores Gamer",
    precio: 899990,
    stock: 5,
    imagen: computador,
    descripcion: "Computador de escritorio para videojuegos."
  },
  {
    id: 6,
    nombre: "Silla Gamer",
    categoria: "Sillas Gamer",
    precio: 159990,
    stock: 12,
    imagen: silla,
    descripcion: "Silla para escritorio gamer."
  },
  {
    id: 7,
    nombre: "Carcassonne",
    categoria: "Juegos de Mesa",
    precio: 29990,
    stock: 14,
    imagen: carcassonne,
    descripcion: "Juego de mesa de estrategia."
  },
  {
    id: 8,
    nombre: "Polerón Gamer",
    categoria: "Merch",
    precio: 34990,
    stock: 18,
    imagen: poleron,
    descripcion: "Polerón de merchandising gamer."
  }
];

// Consultar productos
export function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE);

    if (guardados !== null) {
      const productos = JSON.parse(guardados);
      if (Array.isArray(productos)) return productos;
    }
  } catch (error) {
    console.error("Error leyendo productos:", error);
  }

  return productosIniciales;
}

// Guardar productos
function guardarProductos(productos) {
  localStorage.setItem(CLAVE, JSON.stringify(productos));
}

// Crear producto
export function crearProducto(datos) {
  const productos = obtenerProductos();

  const nuevoProducto = {
    ...datos,
    id: Math.max(0, ...productos.map(p => p.id)) + 1
  };

  guardarProductos([...productos, nuevoProducto]);
  return nuevoProducto;
}

// Actualizar producto
export function actualizarProducto(id, cambios) {
  const productos = obtenerProductos();

  const actualizados = productos.map(producto =>
    producto.id === id
      ? { ...producto, ...cambios, id }
      : producto
  );

  guardarProductos(actualizados);
}

// Eliminar producto
export function eliminarProducto(id) {
  const productos = obtenerProductos();
  guardarProductos(productos.filter(p => p.id !== id));
}
