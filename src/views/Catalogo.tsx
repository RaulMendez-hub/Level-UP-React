
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { obtenerProductos } from "../data/productos";
import "../css/catalogo.css";

export const Catalogo = () => {
  const [productos] = useState(() => obtenerProductos());
  const [categoria, setCategoria] = useState("Todas");
  const [precioMaximo, setPrecioMaximo] = useState(1000000);
  const [parametros, setParametros] = useSearchParams();

  const busqueda = parametros.get("q") || "";

  const categorias = [
    "Todas",
    ...new Set(productos.map(p => p.categoria))
  ];

  const productosFiltrados = productos.filter(producto => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "Todas" ||
      producto.categoria === categoria;

    const coincidePrecio = producto.precio <= precioMaximo;

    return coincideNombre &&
      coincideCategoria &&
      coincidePrecio;
  });

  return (
    <main className="container py-5 tienda-catalogo">
      <h1>Catálogo de productos</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="buscarProducto">
            Buscar producto
          </label>

          <input
            id="buscarProducto"
            className="form-control"
            placeholder="Ej: PlayStation"
            value={busqueda}
            onChange={e =>
              setParametros(
                e.target.value ? { q: e.target.value } : {}
              )
            }
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="categoriaProducto">
            Categoría
          </label>

          <select
            id="categoriaProducto"
            className="form-select"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            {categorias.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="precioProducto">
            Precio máximo: ${precioMaximo.toLocaleString("es-CL")}
          </label>

          <input
            id="precioProducto"
            type="range"
            className="form-range"
            min="10000"
            max="1000000"
            step="10000"
            value={precioMaximo}
            onChange={e =>
              setPrecioMaximo(Number(e.target.value))
            }
          />
        </div>
      </div>

      <p>
        Productos encontrados: {productosFiltrados.length}
      </p>

      <div className="row g-4">
        {productosFiltrados.map(producto => (
          <div className="col-md-6 col-lg-4" key={producto.id}>
            <article className="producto-catalogo">
              <img src={producto.imagen} alt={producto.nombre} />

              <div className="p-3">
                <h2>{producto.nombre}</h2>
                <p>{producto.categoria}</p>

                <strong>
                  ${producto.precio.toLocaleString("es-CL")}
                </strong>

                <p>Stock: {producto.stock}</p>

                <Link
                  to={`/productos/${producto.id}`}
                  className="btn btn-primary"
                >
                  Ver detalle
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <p className="text-center mt-5">
          No encontramos productos con esos filtros.
        </p>
      )}
    </main>
  );
};
