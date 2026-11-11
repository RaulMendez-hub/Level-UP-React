import { useRef, useState, type FormEvent } from "react"
import { Link, Navigate } from "react-router-dom"
import { CATEGORIAS, formatearPrecio, productos, type Categoria } from "../js/BaseDeDatos"
import { obtenerSesion } from "../js/sesion"
import { useProductos } from "../js/useProductos"
import "../css/admin.css"

const CLAVES_CATEGORIA = Object.keys(CATEGORIAS) as Categoria[]

const FORMULARIO_VACIO = {
  nombre: "",
  categoria: "consolas" as Categoria,
  precio: "",
  descripcion: "",
  imagen: "",
}

export const Admin = () => {
  const lista = useProductos()
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [filtro, setFiltro] = useState<"todas" | Categoria>("todas")
  const [error, setError] = useState("")
  const [mensaje, setMensaje] = useState("")
  const campoNombre = useRef<HTMLInputElement>(null)
  const sesion = obtenerSesion()

  // Solo entra quien inició sesión como administrador
  if (!sesion) {
    return <Navigate to="/iniciarSesion" replace />
  }
  if (sesion.rol !== "administrador") {
    return (
      <div className="admin">
        <div className="titulo1">
          <h1>ACCESO RESTRINGIDO</h1>
        </div>
        <p className="admin-aviso">
          Esta página es solo para administradores.{" "}
          <Link to="/iniciarSesion">Inicia sesión</Link> con una cuenta de administrador.
        </p>
      </div>
    )
  }

  const limpiarFormulario = () => {
    setFormulario(FORMULARIO_VACIO)
    setEditandoId(null)
  }

  const editar = (id: number) => {
    const producto = productos.leerPorId(id)
    if (!producto) return
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: String(producto.precio),
      descripcion: producto.descripcion,
      imagen: producto.imagen ?? "",
    })
    setEditandoId(id)
    setError("")
    setMensaje("")
    campoNombre.current?.focus()
  }

  const guardar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const datos = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria,
      descripcion: formulario.descripcion.trim(),
      precio: formulario.precio.trim() === "" ? NaN : Number(formulario.precio),
      imagen: formulario.imagen.trim() || undefined,
    }

    try {
      if (editandoId === null) {
        const creado = productos.crear(datos) // CREATE
        setMensaje(`Producto «${creado.nombre}» creado.`)
      } else {
        const actualizado = productos.actualizar(editandoId, datos) // UPDATE
        if (!actualizado) {
          setError("Ese producto ya no existe.")
          setMensaje("")
          limpiarFormulario()
          return
        }
        setMensaje(`Producto «${actualizado.nombre}» actualizado.`)
      }
      setError("")
      limpiarFormulario()
    } catch (e) {
      // La base de datos valida los datos y explica qué está mal
      setError(e instanceof Error ? e.message : "No se pudo guardar el producto.")
      setMensaje("")
    }
  }

  const eliminar = (id: number, nombre: string) => {
    if (!window.confirm(`¿Eliminar «${nombre}»? También saldrá de los carros.`)) return
    productos.eliminar(id) // DELETE
    if (editandoId === id) limpiarFormulario()
    setError("")
    setMensaje(`Producto «${nombre}» eliminado.`)
  }

  const visibles = filtro === "todas" ? lista : lista.filter((p) => p.categoria === filtro)

  return (
    <div className="admin">
      <div className="titulo1">
        <h1>PANEL DE ADMINISTRACIÓN</h1>
      </div>
      

      <form className="admin-formulario" noValidate onSubmit={guardar}>
        <h2>{editandoId === null ? "Nuevo producto" : `Editar producto n.º ${editandoId}`}</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input
              className="form-control"
              id="nombre"
              onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              ref={campoNombre}
              type="text"
              value={formulario.nombre}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="categoria">Categoría</label>
            <select
              className="form-select"
              id="categoria"
              onChange={(e) =>
                setFormulario({ ...formulario, categoria: e.target.value as Categoria })
              }
              value={formulario.categoria}
            >
              {CLAVES_CATEGORIA.map((clave) => (
                <option key={clave} value={clave}>{CATEGORIAS[clave]}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="precio">Precio (CLP)</label>
            <input
              className="form-control"
              id="precio"
              min="0"
              onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
              step="1"
              type="number"
              value={formulario.precio}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="descripcion">Descripción</label>
            <textarea
              className="form-control"
              id="descripcion"
              onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
              rows={3}
              value={formulario.descripcion}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="imagen">Imagen (ruta o URL, opcional)</label>
            <input
              className="form-control"
              id="imagen"
              onChange={(e) => setFormulario({ ...formulario, imagen: e.target.value })}
              type="text"
              value={formulario.imagen}
            />
          </div>
        </div>

        {error && <p className="admin-error" role="alert">{error}</p>}
        {mensaje && <p className="admin-exito" role="status">{mensaje}</p>}

        <div className="admin-botones">
          <button className="btn btn-primary" type="submit">
            {editandoId === null ? "Crear producto" : "Guardar cambios"}
          </button>
          {editandoId !== null && (
            <button className="btn btn-outline-light" onClick={limpiarFormulario} type="button">
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <div className="admin-barra">
        <p className="admin-contador">
          Mostrando {visibles.length} de {lista.length} productos
        </p>
        <div className="admin-filtro">
          <label htmlFor="filtro">Filtrar por categoría</label>
          <select
            className="form-select form-select-sm"
            id="filtro"
            onChange={(e) => setFiltro(e.target.value as "todas" | Categoria)}
            value={filtro}
          >
            <option value="todas">Todas</option>
            {CLAVES_CATEGORIA.map((clave) => (
              <option key={clave} value={clave}>{CATEGORIAS[clave]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-tabla">
        <table className="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.length === 0 && (
              <tr>
                <td colSpan={5}>No hay productos en esta categoría.</td>
              </tr>
            )}
            {visibles.map((producto) => (
              <tr key={producto.id}>
                <td><img alt="" className="admin-miniatura" src={producto.imagen} /></td>
                <td>{producto.nombre}</td>
                <td>{CATEGORIAS[producto.categoria]}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>
                  <div className="admin-acciones">
                    <button
                      aria-label={`Editar ${producto.nombre}`}
                      className="btn btn-outline-light btn-sm"
                      onClick={() => editar(producto.id)}
                    >
                      Editar
                    </button>
                    <button
                      aria-label={`Eliminar ${producto.nombre}`}
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminar(producto.id, producto.nombre)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
