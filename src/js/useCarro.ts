import { useSyncExternalStore } from "react"
import { carro } from "./BaseDeDatos"


export const useCarro = () => {
  useSyncExternalStore(carro.suscribir, carro.version)

  return {
    items: carro.detalle(),
    total: carro.total(),
    cantidad: carro.cantidadTotal(),
    agregar: carro.agregar,
    cambiarCantidad: carro.cambiarCantidad,
    quitar: carro.quitarProducto,
    vaciar: carro.vaciar,
  }
}
