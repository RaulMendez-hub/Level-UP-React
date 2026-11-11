import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ROLES, formatearPrecio, pedidos, usuarios, type DatosEntrega } from "../../js/BaseDeDatos.js"
import { cerrarSesion, obtenerSesion } from "../../js/sesion.ts"
import "../../css/perfil-cliente.css"

const mensajeDe = (error: unknown, porDefecto: string) =>
  error instanceof Error ? error.message : porDefecto

const formatearFecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })

const formatearDireccion = ({ calle, numero, departamento, comuna, region }: DatosEntrega) =>
  [`${calle} ${numero}`, departamento, comuna, region].filter(Boolean).join(", ")

export const PerfilUsuario = () => {
  const navigate = useNavigate()
  const sesion = obtenerSesion()

  const [nombre, setNombre] = useState(sesion?.nombre ?? "")
  const [email, setEmail] = useState(sesion?.email ?? "")
  const [errorDatos, setErrorDatos] = useState("")
  const [exitoDatos, setExitoDatos] = useState("")

  const [actual, setActual] = useState("")
  const [nueva, setNueva] = useState("")
  const [repetida, setRepetida] = useState("")
  const [errorClave, setErrorClave] = useState("")
  const [exitoClave, setExitoClave] = useState("")

  if (!sesion) {
    return (
      <div className="profile-wrapper">
        <div className="profile-card empty-card">
          <div aria-hidden="true" className="empty-icon">🎮</div>
          <h1 className="profile-title">Inicia sesión para ver tu perfil</h1>
          <p className="subtitle">Aquí verás tus datos y el historial de tus pedidos.</p>
          <Link className="btn btn-gamer mt-4 px-4" to="/iniciarSesion">Iniciar sesión</Link>
        </div>
      </div>
    )
  }

  const misPedidos = pedidos.porUsuario(sesion.id).sort((a, b) => b.id - a.id) // el más reciente primero
  const totalComprado = misPedidos.reduce((suma, pedido) => suma + pedido.total, 0)

  const guardarDatos = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    setExitoDatos("")
    try {
      usuarios.actualizar(sesion.id, { nombre: nombre.trim(), email: email.trim() })
      setErrorDatos("")
      setExitoDatos("Datos actualizados.")
    } catch (e) {
      setErrorDatos(mensajeDe(e, "No se pudieron guardar los datos."))
    }
  }

  const cambiarClave = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    setExitoClave("")
    if (!usuarios.autenticar(sesion.email, actual)) {
      setErrorClave("La contraseña actual no es correcta.")
      return
    }
    if (nueva !== repetida) {
      setErrorClave("Las contraseñas nuevas no coinciden.")
      return
    }
    try {
      usuarios.actualizar(sesion.id, { password: nueva })
      setErrorClave("")
      setExitoClave("Contraseña actualizada.")
      setActual("")
      setNueva("")
      setRepetida("")
    } catch (e) {
      setErrorClave(mensajeDe(e, "No se pudo cambiar la contraseña."))
    }
  }

  const salir = () => {
    cerrarSesion()
    navigate("/iniciarSesion")
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">Mi <span>perfil</span></h1>
          <p className="subtitle">Administra tus datos y revisa tus pedidos.</p>
        </div>

        <div className="profile-body">
          <div className="stats-box">
            <div>
              <span className="etiqueta">Pedidos realizados</span>
              <span className="points-number" data-testid="total-pedidos">{misPedidos.length}</span>
            </div>
            <div>
              <span className="etiqueta">Total comprado</span>
              <span className="points-number" data-testid="total-comprado">{formatearPrecio(totalComprado)}</span>
            </div>
            <span className="badge-discount">{ROLES[sesion.rol]}</span>
          </div>

          <h2 className="section-title">Datos personales</h2>
          <form noValidate onSubmit={guardarDatos}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="perfil-nombre">Nombre</label>
                <input className="form-control" id="perfil-nombre" onChange={(e) => setNombre(e.target.value)} type="text" value={nombre} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="perfil-email">Correo electrónico</label>
                <input autoComplete="email" className="form-control" id="perfil-email" inputMode="email" onChange={(e) => setEmail(e.target.value)} type="text" value={email} />
              </div>
            </div>
            {errorDatos && <p className="error-msg" role="alert">{errorDatos}</p>}
            {exitoDatos && <p className="exito-msg" role="status">{exitoDatos}</p>}
            <button className="btn btn-gamer mt-3 px-4" type="submit">Guardar cambios</button>
          </form>

          <div className="divider" />

          <h2 className="section-title">Cambiar contraseña</h2>
          <form noValidate onSubmit={cambiarClave}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label" htmlFor="clave-actual">Contraseña actual</label>
                <input autoComplete="current-password" className="form-control" id="clave-actual" onChange={(e) => setActual(e.target.value)} type="password" value={actual} />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="clave-nueva">Nueva contraseña</label>
                <input autoComplete="new-password" className="form-control" id="clave-nueva" onChange={(e) => setNueva(e.target.value)} type="password" value={nueva} />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="clave-repetida">Repite la nueva contraseña</label>
                <input autoComplete="new-password" className="form-control" id="clave-repetida" onChange={(e) => setRepetida(e.target.value)} type="password" value={repetida} />
              </div>
            </div>
            {errorClave && <p className="error-msg" role="alert">{errorClave}</p>}
            {exitoClave && <p className="exito-msg" role="status">{exitoClave}</p>}
            <button className="btn btn-gamer mt-3 px-4" type="submit">Actualizar contraseña</button>
          </form>

          <div className="divider" />

          <h2 className="section-title">Mis pedidos</h2>
          {misPedidos.length === 0 ? (
            <p className="hint">
              Aún no tienes pedidos. <Link to="/consolas">Ver productos</Link>
            </p>
          ) : (
            misPedidos.map((pedido) => (
              <article className="pedido" key={pedido.id}>
                <div className="pedido-cabecera">
                  <strong>Pedido n.º {pedido.id}</strong>
                  <span>{formatearFecha(pedido.fecha)}</span>
                  <span className="badge-discount">
                    {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                  </span>
                  <strong>{formatearPrecio(pedido.total)}</strong>
                </div>
                <ul>
                  {pedido.items.map((item) => (
                    <li key={item.productoId}>
                      {item.nombre} × {item.cantidad} — {formatearPrecio(item.subtotal)}
                    </li>
                  ))}
                </ul>
                <p className="hint">Enviado a {formatearDireccion(pedido.entrega)}</p>
              </article>
            ))
          )}

          <div className="divider" />

          <button className="btn btn-logout px-4" onClick={salir} type="button">Cerrar sesión</button>
        </div>
      </div>
    </div>
  )
}
