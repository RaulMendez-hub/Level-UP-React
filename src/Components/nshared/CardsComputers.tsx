import { Link } from "react-router-dom"
import { productos, carro, formatearPrecio } from "../../js/BaseDeDatos"

export const CardsComputers = () => {
  const computadores = productos.porCategoria('computadores')

  return (
    <div>
      <div className="titulo1">
        <h1>COMPUTADORES GAMER</h1>
      </div>
      <div className="Accesorios">
        {computadores.map((computadores) => (
          <div className="card" key={computadores.id}>
            <img alt="..." className="card-img-top" src={computadores.imagen} />
            <div className="card-body">
              <h5 className="card-title">{computadores.nombre}</h5>
              <p className="card-text">{computadores.descripcion}</p>
              <p>{formatearPrecio(computadores.precio)}</p>
              <Link
                className="btn btn-primary"
                to="/Carro"
                onClick={() => carro.agregar(computadores.id)}
              >
                Añadir al carro
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
