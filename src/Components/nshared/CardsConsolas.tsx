    import { Link } from "react-router-dom"
import { productos, carro, formatearPrecio } from "../../js/BaseDeDatos"

export const CardsConsolas = () => {
  const consolas = productos.porCategoria("consolas")

  return (
    <div>
      <div className="titulo1">
        <h1>CONSOLAS</h1>
      </div>
      <div className="consolas">
        {consolas.map((consola) => (
          <div className="card" key={consola.id}>
            <img alt="..." className="card-img-top" src={consola.imagen} />
            <div className="card-body">
              <h5 className="card-title">{consola.nombre}</h5>
              <p className="card-text">{consola.descripcion}</p>
              <p>{formatearPrecio(consola.precio)}</p>
              <Link
                className="btn btn-primary"
                to="/Carro"
                onClick={() => carro.agregar(consola.id)}
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