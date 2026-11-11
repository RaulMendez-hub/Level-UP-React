import { Link } from "react-router-dom"
import { formatearPrecio } from "../js/BaseDeDatos"
import { obtenerSesion } from "../js/sesion"
import { useCarro } from "../js/useCarro"
import "../css/carro.css"

export const Carro = () => {
  const { items, total, cantidad, cambiarCantidad, quitar, vaciar } = useCarro()
  const sesion = obtenerSesion()

  return (
    <div className="carro">
      <div className="titulo1">
        <h1>CARRO DE COMPRAS</h1>
      </div>

      {items.length === 0 ? (
        <div className="carro-mensaje">
          <p>Tu carro está vacío.</p>
          <Link className="btn btn-primary" to="/consolas">
            Seguir comprando
          </Link>
        </div>
      ) : (
        <>
          {items.map(({ id, cantidad: unidades, producto, subtotal }) => (
            <div className="card" key={id}>
              <img alt={producto.nombre} className="card-img-top" src={producto.imagen} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p>{formatearPrecio(producto.precio)} c/u</p>
                <div className="carro-cantidad">
                  <button
                    aria-label={`Quitar una unidad de ${producto.nombre}`}
                    className="btn btn-outline-secondary btn-sm"
                    disabled={unidades <= 1}
                    onClick={() => cambiarCantidad(producto.id, unidades - 1)}
                  >
                    −
                  </button>
                  <span aria-label={`Cantidad de ${producto.nombre}`}>{unidades}</span>
                  <button
                    aria-label={`Agregar una unidad de ${producto.nombre}`}
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => cambiarCantidad(producto.id, unidades + 1)}
                  >
                    +
                  </button>
                </div>
                <p>
                  Subtotal: <strong>{formatearPrecio(subtotal)}</strong>
                </p>
                <button className="btn btn-danger btn-sm" onClick={() => quitar(producto.id)}>
                  Quitar
                </button>
              </div>
            </div>
          ))}

          <div className="carro-resumen">
            <p className="carro-total">
              Total ({cantidad} {cantidad === 1 ? "producto" : "productos"}):{" "}
              <strong>{formatearPrecio(total)}</strong>
            </p>
            <button className="btn btn-outline-light" onClick={vaciar}>
              Vaciar carro
            </button>
            {sesion ? (
              <Link className="pago" to="/checkout">
                Continuar con la compra
              </Link>
            ) : (
              <Link className="pago" to="/iniciarSesion">
                Inicia sesión para continuar
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}
