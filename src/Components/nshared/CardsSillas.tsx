import {Link} from "react-router-dom"
import silla from "../../image/silla.jpg"
import sillacorsair from "../../image/sillacorsair.webp"
import razer from "../../image/razer.jpeg"
import armor from "../../image/armor.png"


export const CardsSillas = () => {
  return (
    <div>
      <div className="titulo1">
        <h1>SILLAS GAMER</h1>
      </div>
      <div className="sillas">
        <div className="card">
          <img alt="..." className="card-img-top" src={silla} />
          <div className="card-body">
            <h5 className="card-title">Silla Gamer Secretlab Titan Evo</h5>
            <p className="card-text">
              Diseñada en colaboración con especialistas en ergonomía, la Secretlab
              Titan Evo se adapta a tu cuerpo con un sistema de soporte lumbar
              integrado y espuma de enfriamiento que mantiene la frescura durante
              largas sesiones. Su estructura de acero reforzado soporta hasta 130kg
              sin perder estabilidad. Los reposabrazos 4D magnéticos y la
              reclinación de hasta 165° te permiten encontrar la posición perfecta
              tanto para jugar como para tomar un descanso, mientras que su tapizado
              de cuero sintético premium resiste el desgaste diario.
            </p>
            <p>$399.990</p>
            <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
          </div>
        </div>
        <div className="card">
          <img alt="..." className="card-img-top" src={sillacorsair} />
          <div className="card-body">
            <h5 className="card-title">Silla Gamer Corsair TC200</h5>
            <p className="card-text">
              La Corsair TC200 combina un tapizado de tela transpirable con un
              armazón de acero de alta densidad, ideal para quienes pasan largas
              horas frente al computador y buscan mantenerse frescos incluso en
              climas cálidos. Su cojín lumbar y cervical desmontables permiten
              personalizar el soporte según tu postura. Cuenta con reposabrazos 4D
              ajustables en altura, ancho, profundidad y rotación, además de un
              mecanismo de reclinación de hasta 160° y base de aluminio reforzada
              que garantiza estabilidad y durabilidad en el tiempo.
            </p>
            <p>$249.990</p>
            <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
          </div>
        </div>
        <div className="card">
          <img alt="..." className="card-img-top" src={razer} />
          <div className="card-body">
            <h5 className="card-title">Silla Gamer Razer Iskur</h5>
            <p className="card-text">
              La Razer Iskur fue diseñada desde cero pensando en la salud postural,
              incorporando un soporte lumbar curvo integrado que se ajusta a la
              forma natural de tu columna sin necesidad de cojines adicionales. Su
              espuma multicapa de alta densidad conserva su firmeza incluso tras
              años de uso intensivo. Ofrece reposabrazos multidireccionales de
              espuma acolchada, reclinación ajustable hasta 152° y un revestimiento
              sintético resistente al desgaste, todo bajo el característico diseño
              negro con acentos verdes de la marca.
            </p>
            <p>$329.990</p>
            <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
          </div>
        </div>
        <div className="card">
          <img alt="..." className="card-img-top" src={armor} />
          <div className="card-body">
            <h5 className="card-title">Silla Gamer Cougar Armor One</h5>
            <p className="card-text">
              La Cougar Armor One es una opción robusta y accesible, construida con
              una carcasa de alta resistencia y un tapizado de cuero PU que facilita
              la limpieza diaria. Su respaldo reclinable hasta 180° la convierte en
              una alternativa versátil tanto para gaming intenso como para descansar
              entre partidas. Incluye cojines lumbar y cervical de espuma
              viscoelástica, reposabrazos 2D ajustables en altura y una base de
              cinco ruedas de nylon silenciosas, pensada para quienes buscan calidad
              y comodidad sin un desembolso excesivo.
            </p>
            <p>$159.990</p>
            <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
