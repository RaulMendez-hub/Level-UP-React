import { usuarios, type Usuario } from "./BaseDeDatos"

const CLAVE = "usuarioActual"


export const guardarSesion = (usuario: Usuario, recordar: boolean) => {
  cerrarSesion()
  const almacen = recordar ? localStorage : sessionStorage
  almacen.setItem(CLAVE, String(usuario.id))
}


export const obtenerSesion = (): Usuario | null => {
  const id = localStorage.getItem(CLAVE) ?? sessionStorage.getItem(CLAVE)
  return id === null ? null : usuarios.leerPorId(id)
}

export const cerrarSesion = () => {
  localStorage.removeItem(CLAVE)
  sessionStorage.removeItem(CLAVE)
}