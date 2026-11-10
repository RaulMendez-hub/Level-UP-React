import { Link } from "react-router-dom"
import { productos, carro, formatearPrecio } from "../../js/BaseDeDatos"

export const CardsSillas = () => {
  const sillas = productos.porCategoria('sillas')

  return (
    <div>
      <div className="titulo1">
        <h1>SILLAS GAMER</h1>
      </div>
      <div className="merch">
        {sillas.map((sillas) => (
          <div className="card" key={sillas.id}>
            <img alt="..." className="card-img-top" src={sillas.imagen} />
            <div className="card-body">
              <h5 className="card-title">{sillas.nombre}</h5>
              <p className="card-text">{sillas.descripcion}</p>
              <p>{formatearPrecio(sillas.precio)}</p>
              <Link
                className="btn btn-primary"
                to="/Carro"
                onClick={() => carro.agregar(sillas.id)}
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
// import noteAsus from "../../image/note-asus.jpeg";
// import computador from "../../image/computador.jpg";
// import legion from "../../image/legion.webp";
// import hyperpc from "../../image/hyperpc.webp";

// export const CardsComputers = () => {
//   return (
//     <div>
//         <div className="titulo1">
//             <h1>COMPUTADORES</h1>
//         </div>
//         <div className="computadores">
//             <div className="card">
//             <img alt="..." className="card-img-top" src={noteAsus} />
//             <div className="card-body">
//                 <h5 className="card-title">Notebook ASUS ROG Strix G16</h5>
//                 <p className="card-text">
//                 El ASUS ROG Strix G16 combina un procesador Intel Core i7 de última
//                 generación con una tarjeta gráfica NVIDIA GeForce RTX 4060, entregando
//                 el rendimiento necesario para correr los títulos más exigentes en alta
//                 resolución y con ray tracing activado. Su pantalla de 16" con 165Hz de
//                 tasa de refresco y su sistema de refrigeración ROG Intelligent Cooling
//                 mantienen temperaturas óptimas incluso en sesiones de juego
//                 prolongadas, mientras que 16GB de RAM y un SSD de 1TB aseguran cargas
//                 rápidas y multitarea sin trabas.
//                 </p>
//                 <p>$1.199.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={computador} />
//             <div className="card-body">
//                 <h5 className="card-title">PC Gamer MSI Aegis R2</h5>
//                 <p className="card-text">
//                 El MSI Aegis R2 llega listo para competir con un procesador Intel Core
//                 i5 de 12va generación y una tarjeta gráfica NVIDIA GeForce RTX 4070,
//                 ideal para gaming en 1440p con configuraciones gráficas al máximo. Su
//                 gabinete con panel lateral de vidrio templado permite lucir la
//                 iluminación RGB Mystic Light interna, mientras que 16GB de RAM DDR5 y
//                 un SSD NVMe de 1TB garantizan una experiencia fluida tanto en juegos
//                 como en tareas de streaming simultáneas.
//                 </p>
//                 <p>$1.449.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={legion} />
//             <div className="card-body">
//                 <h5 className="card-title">Notebook Lenovo Legion 5 Pro</h5>
//                 <p className="card-text">
//                 El Lenovo Legion 5 Pro está equipado con un procesador AMD Ryzen 7 y
//                 una GPU NVIDIA GeForce RTX 4060, ofreciendo un equilibrio excelente
//                 entre potencia gráfica y eficiencia energética para sesiones de juego
//                 largas sin comprometer el rendimiento. Su pantalla QHD de 16" con
//                 165Hz y calibración de fábrica para color preciso lo hace igual de
//                 atractivo para diseño y edición, mientras que su teclado
//                 retroiluminado RGB por zonas y bisagras reforzadas soportan el uso
//                 intensivo diario.
//                 </p>
//                 <p>$1.299.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={hyperpc} />
//             <div className="card-body">
//                 <h5 className="card-title">PC Gamer HYPERX Predator X</h5>
//                 <p className="card-text">
//                 Pensado para quienes buscan máximo rendimiento sin límites, el HYPERX
//                 Predator X integra un procesador Intel Core i9 junto a una tarjeta
//                 gráfica NVIDIA GeForce RTX 4080, capaz de mover los títulos más
//                 exigentes en 4K con trazado de rayos activado. Cuenta con 32GB de RAM
//                 DDR5, un SSD NVMe de 2TB y un sistema de refrigeración líquida AIO de
//                 240mm que mantiene el equipo estable incluso en las sesiones de
//                 overclocking más demandantes, todo dentro de un gabinete con flujo de
//                 aire optimizado.
//                 </p>
//                 <p>$2.199.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//         </div>
//         </div>
//   )
// }




// import {Link} from "react-router-dom";
// import poleragta6 from "../../image/poleragta6.webp"
// import poleraplay from "../../image/poleraplay.jpeg"
// import poleroncyber from "../../image/poleroncyber.png"
// import poleronmine from "../../image/poleronmine.jpeg"

// export const CardsMerch = () => {
//   return (
//     <div>
//         <div className="titulo1">
//             <h1>MERCHANDISING</h1>
//         </div>
//         <div className="merchandising">
//             <div className="card">
//             <img alt="..." className="card-img-top" src={poleragta6} />
//             <div className="card-body">
//                 <h5 className="card-title">Polera Grand Theft Auto VI</h5>
//                 <p className="card-text">
//                 Polera confeccionada en algodón peinado 100%, con estampado de alta
//                 definición inspirado en el arte oficial de Grand Theft Auto VI. Su
//                 tela de gramaje medio ofrece comodidad durante todo el día sin perder
//                 forma tras múltiples lavados. Disponible en tallas S a XXL con corte
//                 unisex, es la prenda ideal para los fanáticos que ya cuentan los días
//                 para el lanzamiento del juego más esperado de la industria.
//                 </p>
//                 <p>$15.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={poleraplay} />
//             <div className="card-body">
//                 <h5 className="card-title">Polera PlayStation Logo Clásico</h5>
//                 <p className="card-text">
//                 Con el icónico logo de PlayStation estampado al frente, esta polera de
//                 algodón suave combina un diseño minimalista con la nostalgia de la
//                 marca que marcó a generaciones de jugadores. Su serigrafía de alta
//                 durabilidad resiste el uso y lavado frecuente sin agrietarse. Un
//                 básico infaltable para cualquier fanático de la marca, perfecta para
//                 combinar con jeans o shorts en el día a día o para lucir en juntas
//                 gamer y convenciones.
//                 </p>
//                 <p>$13.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={poleroncyber} />
//             <div className="card-body">
//                 <h5 className="card-title">Polerón Cyberpunk 2077</h5>
//                 <p className="card-text">
//                 Este polerón con capucha presenta el logo de Cyberpunk 2077 en un
//                 diseño bordado de alta resistencia, sobre una tela polar interior que
//                 brinda abrigo y suavidad incluso en los días más fríos. Su cierre
//                 frontal y bolsillo canguro suman comodidad y funcionalidad. Fabricado
//                 en una mezcla de algodón y poliéster que evita el desgaste prematuro,
//                 es la prenda perfecta para los fans de Night City que buscan destacar
//                 con un estilo urbano y gamer a la vez.
//                 </p>
//                 <p>$29.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//             <div className="card">
//             <img alt="..." className="card-img-top" src={poleronmine} />
//             <div className="card-body">
//                 <h5 className="card-title">Polerón Minecraft Creeper</h5>
//                 <p className="card-text">
//                 Con la icónica cara del Creeper estampada en el pecho, este polerón de
//                 tela afelpada por dentro combina comodidad y un diseño reconocible al
//                 instante por cualquier fanático de Minecraft. Su capucha ajustable y
//                 puños elásticos ayudan a mantener el calor en cualquier estación.
//                 Disponible en tallas para adolescentes y adultos, es una opción ideal
//                 tanto para el uso diario como para regalar a los seguidores más fieles
//                 del universo de bloques más famoso de los videojuegos.
//                 </p>
//                 <p>$27.990</p>
//                 <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//             </div>
//             </div>
//         </div>
//         </div>
//   )
// }





// import {Link} from "react-router-dom"
// import silla from "../../image/silla.jpg"
// import sillacorsair from "../../image/sillacorsair.webp"
// import razer from "../../image/razer.jpeg"
// import armor from "../../image/armor.png"


// export const CardsSillas = () => {
//   return (
//     <div>
//       <div className="titulo1">
//         <h1>SILLAS GAMER</h1>
//       </div>
//       <div className="sillas">
//         <div className="card">
//           <img alt="..." className="card-img-top" src={silla} />
//           <div className="card-body">
//             <h5 className="card-title">Silla Gamer Secretlab Titan Evo</h5>
//             <p className="card-text">
//               Diseñada en colaboración con especialistas en ergonomía, la Secretlab
//               Titan Evo se adapta a tu cuerpo con un sistema de soporte lumbar
//               integrado y espuma de enfriamiento que mantiene la frescura durante
//               largas sesiones. Su estructura de acero reforzado soporta hasta 130kg
//               sin perder estabilidad. Los reposabrazos 4D magnéticos y la
//               reclinación de hasta 165° te permiten encontrar la posición perfecta
//               tanto para jugar como para tomar un descanso, mientras que su tapizado
//               de cuero sintético premium resiste el desgaste diario.
//             </p>
//             <p>$399.990</p>
//             <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//           </div>
//         </div>
//         <div className="card">
//           <img alt="..." className="card-img-top" src={sillacorsair} />
//           <div className="card-body">
//             <h5 className="card-title">Silla Gamer Corsair TC200</h5>
//             <p className="card-text">
//               La Corsair TC200 combina un tapizado de tela transpirable con un
//               armazón de acero de alta densidad, ideal para quienes pasan largas
//               horas frente al computador y buscan mantenerse frescos incluso en
//               climas cálidos. Su cojín lumbar y cervical desmontables permiten
//               personalizar el soporte según tu postura. Cuenta con reposabrazos 4D
//               ajustables en altura, ancho, profundidad y rotación, además de un
//               mecanismo de reclinación de hasta 160° y base de aluminio reforzada
//               que garantiza estabilidad y durabilidad en el tiempo.
//             </p>
//             <p>$249.990</p>
//             <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//           </div>
//         </div>
//         <div className="card">
//           <img alt="..." className="card-img-top" src={razer} />
//           <div className="card-body">
//             <h5 className="card-title">Silla Gamer Razer Iskur</h5>
//             <p className="card-text">
//               La Razer Iskur fue diseñada desde cero pensando en la salud postural,
//               incorporando un soporte lumbar curvo integrado que se ajusta a la
//               forma natural de tu columna sin necesidad de cojines adicionales. Su
//               espuma multicapa de alta densidad conserva su firmeza incluso tras
//               años de uso intensivo. Ofrece reposabrazos multidireccionales de
//               espuma acolchada, reclinación ajustable hasta 152° y un revestimiento
//               sintético resistente al desgaste, todo bajo el característico diseño
//               negro con acentos verdes de la marca.
//             </p>
//             <p>$329.990</p>
//             <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//           </div>
//         </div>
//         <div className="card">
//           <img alt="..." className="card-img-top" src={armor} />
//           <div className="card-body">
//             <h5 className="card-title">Silla Gamer Cougar Armor One</h5>
//             <p className="card-text">
//               La Cougar Armor One es una opción robusta y accesible, construida con
//               una carcasa de alta resistencia y un tapizado de cuero PU que facilita
//               la limpieza diaria. Su respaldo reclinable hasta 180° la convierte en
//               una alternativa versátil tanto para gaming intenso como para descansar
//               entre partidas. Incluye cojines lumbar y cervical de espuma
//               viscoelástica, reposabrazos 2D ajustables en altura y una base de
//               cinco ruedas de nylon silenciosas, pensada para quienes buscan calidad
//               y comodidad sin un desembolso excesivo.
//             </p>
//             <p>$159.990</p>
//             <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
