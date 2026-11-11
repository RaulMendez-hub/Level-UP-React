import { useSyncExternalStore } from "react"
import { productos } from "./BaseDeDatos"


export const useProductos = () => {
  useSyncExternalStore(productos.suscribir, productos.version)
  return productos.leerTodos()
}
