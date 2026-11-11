import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link, Navigate } from "react-router-dom"
import { REGIONES, formatearPrecio, pedidos, validarEntrega, type Pedido } from "../js/BaseDeDatos"
import { obtenerSesion } from "../js/sesion"
import { useCarro } from "../js/useCarro"
import "../css/checkout.css"

type Campo =
  | "nombre" | "email" | "telefono" | "region" | "comuna"
  | "calle" | "numero" | "departamento" | "referencias"

type CampoTextoProps = {
  id: Campo
  etiqueta: string
  valor: string
  error?: string
  onChange: (valor: string) => void
  autoComplete?: string
  inputMode?: "text" | "tel" | "email"
  clase?: string
}

const CampoTexto = ({
  id, etiqueta, valor, error, onChange, autoComplete, inputMode, clase = "col-md-6",
}: CampoTextoProps) => (
  <div className={clase}>
    <label className="form-label" htmlFor={id}>{etiqueta}</label>
    <input
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={error ? true : undefined}
      autoComplete={autoComplete}
      className="form-control"
      id={id}
      inputMode={inputMode}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      value={valor}
    />
    {error && <small className="checkout-error" id={`${id}-error`}>{error}</small>}
  </div>
)

export const Checkout = () => {
  const sesion = obtenerSesion()
  const { items, total, cantidad } = useCarro()
  const [datos, setDatos] = useState({
    nombre: sesion?.nombre ?? "",
    email: sesion?.email ?? "",
    telefono: "",
    region: "",
    comuna: "",
    calle: "",
    numero: "",
    departamento: "",
    referencias: "",
  })
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({})
  const [errorGeneral, setErrorGeneral] = useState("")
  const [pedido, setPedido] = useState<Pedido | null>(null)

  if (!sesion) {
    return <Navigate to="/iniciarSesion" replace />
  }

  if (pedido) {
    const { calle, numero, departamento, comuna, region } = pedido.entrega
    const direccion = [`${calle} ${numero}`, departamento, comuna, region].filter(Boolean).join(", ")
    return (
      <div className="checkout">
        <div className="titulo1">
          <h1>PEDIDO CONFIRMADO</h1>
        </div>
        <div className="checkout-confirmacion" role="status">
          <h2>¡Gracias por tu compra, {pedido.entrega.nombre}!</h2>
          <p>
            Tu pedido n.º {pedido.id} quedó registrado por {formatearPrecio(pedido.total)}.
          </p>
          <p>Lo enviaremos a {direccion}.</p>
          <Link className="btn btn-primary" to="/">
            Seguir comprando
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return <Navigate to="/Carro" replace />
  }

  const cambiar = (campo: Campo) => (valor: string) => setDatos({ ...datos, [campo]: valor })

  const confirmar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const encontrados = validarEntrega(datos)
    setErrores(encontrados)
    setErrorGeneral("")
    if (Object.keys(encontrados).length > 0) return

    try {
      const limpios = Object.fromEntries(
        Object.entries(datos).map(([clave, valor]) => [clave, valor.trim()]),
      ) as typeof datos
      setPedido(pedidos.crearDesdeCarro(sesion.id, limpios))
    } catch (e) {
      setErrorGeneral(e instanceof Error ? e.message : "No se pudo registrar el pedido.")
    }
  }

  return (
    <div className="checkout">
      <div className="titulo1">
        <h1>CHECKOUT</h1>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <form className="checkout-caja" noValidate onSubmit={confirmar}>
            <h2>Datos de entrega</h2>
            <div className="row g-3">
              <CampoTexto id="nombre" etiqueta="Nombre de quien recibe" valor={datos.nombre}
                error={errores.nombre} onChange={cambiar("nombre")} autoComplete="name" />
              <CampoTexto id="telefono" etiqueta="Teléfono" valor={datos.telefono}
                error={errores.telefono} onChange={cambiar("telefono")} autoComplete="tel" inputMode="tel" />
              <CampoTexto id="email" etiqueta="Correo electrónico" valor={datos.email}
                error={errores.email} onChange={cambiar("email")} autoComplete="email" inputMode="email" clase="col-12" />

              <div className="col-md-6">
                <label className="form-label" htmlFor="region">Región</label>
                <select
                  aria-describedby={errores.region ? "region-error" : undefined}
                  aria-invalid={errores.region ? true : undefined}
                  className="form-select"
                  id="region"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => cambiar("region")(e.target.value)}
                  value={datos.region}
                >
                  <option value="">Selecciona una región</option>
                  {REGIONES.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errores.region && <small className="checkout-error" id="region-error">{errores.region}</small>}
              </div>
              <CampoTexto id="comuna" etiqueta="Comuna" valor={datos.comuna}
                error={errores.comuna} onChange={cambiar("comuna")} autoComplete="address-level2" />

              <CampoTexto id="calle" etiqueta="Calle" valor={datos.calle}
                error={errores.calle} onChange={cambiar("calle")} autoComplete="address-line1" clase="col-md-8" />
              <CampoTexto id="numero" etiqueta="Número" valor={datos.numero}
                error={errores.numero} onChange={cambiar("numero")} clase="col-md-4" />
              <CampoTexto id="departamento" etiqueta="Departamento o casa (opcional)" valor={datos.departamento}
                onChange={cambiar("departamento")} autoComplete="address-line2" clase="col-12" />

              <div className="col-12">
                <label className="form-label" htmlFor="referencias">Referencias (opcional)</label>
                <textarea
                  className="form-control"
                  id="referencias"
                  onChange={(e) => cambiar("referencias")(e.target.value)}
                  placeholder="Por ejemplo: portón negro, timbre del segundo piso"
                  rows={3}
                  value={datos.referencias}
                />
              </div>
            </div>

            {errorGeneral && <p className="checkout-error checkout-error-general" role="alert">{errorGeneral}</p>}

            <button className="pago" type="submit">Confirmar pedido</button>
          </form>
        </div>

        <aside className="col-lg-5">
          <div className="checkout-caja">
            <h2>Resumen del pedido</h2>
            <ul className="checkout-items">
              {items.map(({ id, cantidad: unidades, producto, subtotal }) => (
                <li key={id}>
                  <span>{producto.nombre} × {unidades}</span>
                  <span>{formatearPrecio(subtotal)}</span>
                </li>
              ))}
            </ul>
            <p className="checkout-total">
              Total ({cantidad} {cantidad === 1 ? "producto" : "productos"}):{" "}
              <strong>{formatearPrecio(total)}</strong>
            </p>
            <Link to="/Carro">Volver al carro</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
