
import { Link, useParams } from "react-router-dom";
import { obtenerProductos } from "../data/productos";

export const DetalleProducto = () => {
  const { id } = useParams();

  const producto = obtenerProductos().find(
    p => p.id === Number(id)
  );

  if (!producto) {
    return (
      <main className="container py-5 text-white">
        <h2>Producto no encontrado</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main className="container py-5 text-white tienda-detalle">
      <div className="row align-items-center g-4">
        <div className="col-md-6 text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"
            style={{
              maxHeight: "400px",
              objectFit: "contain"
            }}
          />
        </div>

        <div className="col-md-6">
          <h2>{producto.nombre}</h2>

          <p>Categoría: {producto.categoria}</p>
          <p>{producto.descripcion}</p>

          <h3 className="text-success">
            ${producto.precio.toLocaleString("es-CL")}
          </h3>

          <p>Unidades disponibles: {producto.stock}</p>

          <Link
            to="/productos"
            className="btn btn-primary"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    </main>
  );
};
