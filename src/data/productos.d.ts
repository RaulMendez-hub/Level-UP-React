
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen: string;
  descripcion: string;
}

export function obtenerProductos(): Producto[];

export function crearProducto(
  datos: Omit<Producto, "id">
): Producto;

export function actualizarProducto(
  id: number,
  cambios: Partial<Omit<Producto, "id">>
): void;

export function eliminarProducto(id: number): void;
