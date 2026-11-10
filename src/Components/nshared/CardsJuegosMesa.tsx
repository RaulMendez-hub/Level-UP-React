import { Link } from "react-router-dom"
import { productos, carro, formatearPrecio } from "../../js/BaseDeDatos"

export const CardsJuegosMesa = () => {
  const juegosmesa = productos.porCategoria('juegosMesa')

  return (
    <div>
      <div className="titulo1">
        <h1>JUEGOS DE MESA</h1>
      </div>
      <div className="Accesorios">
        {juegosmesa.map((juegosmesa) => (
          <div className="card" key={juegosmesa.id}>
            <img alt="..." className="card-img-top" src={juegosmesa.imagen} />
            <div className="card-body">
              <h5 className="card-title">{juegosmesa.nombre}</h5>
              <p className="card-text">{juegosmesa.descripcion}</p>
              <p>{formatearPrecio(juegosmesa.precio)}</p>
              <Link
                className="btn btn-primary"
                to="/Carro"
                onClick={() => carro.agregar(juegosmesa.id)}
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









// import { Link } from "react-router-dom";
// import catran from "../../image/catran.jpeg";
// import carcassonne from "../../image/carcassonne.webp";
// import dixit from "../../image/dixit.jpeg";
// import kittens from "../../image/kittens.jpeg";

// export const CardsJuegosMesa = () => {
//   return (
//     <div>
//         <div className="titulo1">
//             <h1>JUEGOS DE MESA</h1>
//         </div>
//         <div className="juegosdemesa">
//             <div className="card">
//             <img alt="..." className="card-img-top" src={catran} />
//             <div className="card-body">
//                 <h5 className="card-title">Catan</h5>
//                 <p className="card-text">
//                 Catan es el clásico juego de estrategia y comercio donde cada jugador
//                 construye asentamientos, ciudades y rutas en la isla de Catán,
//                 intercambiando recursos como madera, ladrillo, trigo, lana y mineral
//                 para expandir su territorio. Su sistema de tablero modular hace que
//                 cada partida sea distinta a la anterior. Pensado para 3 a 4 jugadores
//                 (ampliable a 6 con expansión), combina negociación, planificación y un
//                 poco de suerte con los dados, convirtiéndolo en una opción ideal tanto
//                 para principiantes como para jugadores experimentados en juegos de
//                 mesa modernos.
//                 </p>
//                 <p>$34.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={carcassonne} />
//             <div className="card-body">
//                 <h5 className="card-title">Carcassonne</h5>
//                 <p className="card-text">
//                 En Carcassonne los jugadores construyen un paisaje medieval colocando
//                 fichas de terreno con ciudades, caminos, monasterios y campos, para
//                 luego posicionar a sus "seguidores" y reclamar puntos según cómo se
//                 desarrolle el mapa compartido. Ninguna partida se repite, ya que el
//                 tablero se crea sobre la marcha. Con reglas simples de aprender pero
//                 con profundidad estratégica en la gestión de seguidores, es perfecto
//                 para 2 a 5 jugadores y se ha convertido en uno de los juegos de mesa
//                 alemanes más premiados e influyentes de las últimas décadas.
//                 </p>
//                 <p>$29.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={dixit} />
//             <div className="card-body">
//                 <h5 className="card-title">Dixit</h5>
//                 <p className="card-text">
//                 Dixit invita a los jugadores a interpretar ilustraciones oníricas y
//                 evocadoras a través de una palabra, frase o sonido que las describa,
//                 mientras el resto intenta adivinar cuál de las cartas mostradas
//                 corresponde a la pista dada. La clave está en encontrar el equilibrio
//                 entre ser demasiado obvio o demasiado ambiguo. Con sus hermosas cartas
//                 ilustradas y mecánicas simples de narrativa y deducción, es ideal para
//                 grupos de 3 a 6 jugadores que buscan una experiencia creativa,
//                 divertida y distinta en cada sesión, apta para todas las edades.
//                 </p>
//                 <p>$27.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={kittens} />
//             <div className="card-body">
//                 <h5 className="card-title">Exploding Kittens</h5>
//                 <p className="card-text">
//                 Exploding Kittens es un juego de cartas rápido y desopilante donde los
//                 jugadores van robando cartas del mazo intentando evitar sacar un "gato
//                 explosivo" que los elimine de la partida. Cartas especiales permiten
//                 esquivar el desastre, saltarse turnos o espiar el mazo antes de robar.
//                 Con partidas de corta duración y su característico humor absurdo
//                 ilustrado, funciona perfecto para grupos de 2 a 5 jugadores que buscan
//                 algo ágil, tenso y muy entretenido para romper el hielo o cerrar una
//                 noche de juegos.
//                 </p>
//                 <p>$19.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//         </div>
//         </div>
//   )
// }
