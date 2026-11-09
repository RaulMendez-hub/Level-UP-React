import {Link} from "react-router-dom";
import poleragta6 from "../../image/poleragta6.webp"
import poleraplay from "../../image/poleraplay.jpeg"
import poleroncyber from "../../image/poleroncyber.png"
import poleronmine from "../../image/poleronmine.jpeg"

export const CardsMerch = () => {
  return (
    <div>
        <div className="titulo1">
            <h1>MERCHANDISING</h1>
        </div>
        <div className="merchandising">
            <div className="card">
            <img alt="..." className="card-img-top" src={poleragta6} />
            <div className="card-body">
                <h5 className="card-title">Polera Grand Theft Auto VI</h5>
                <p className="card-text">
                Polera confeccionada en algodón peinado 100%, con estampado de alta
                definición inspirado en el arte oficial de Grand Theft Auto VI. Su
                tela de gramaje medio ofrece comodidad durante todo el día sin perder
                forma tras múltiples lavados. Disponible en tallas S a XXL con corte
                unisex, es la prenda ideal para los fanáticos que ya cuentan los días
                para el lanzamiento del juego más esperado de la industria.
                </p>
                <p>$15.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={poleraplay} />
            <div className="card-body">
                <h5 className="card-title">Polera PlayStation Logo Clásico</h5>
                <p className="card-text">
                Con el icónico logo de PlayStation estampado al frente, esta polera de
                algodón suave combina un diseño minimalista con la nostalgia de la
                marca que marcó a generaciones de jugadores. Su serigrafía de alta
                durabilidad resiste el uso y lavado frecuente sin agrietarse. Un
                básico infaltable para cualquier fanático de la marca, perfecta para
                combinar con jeans o shorts en el día a día o para lucir en juntas
                gamer y convenciones.
                </p>
                <p>$13.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={poleroncyber} />
            <div className="card-body">
                <h5 className="card-title">Polerón Cyberpunk 2077</h5>
                <p className="card-text">
                Este polerón con capucha presenta el logo de Cyberpunk 2077 en un
                diseño bordado de alta resistencia, sobre una tela polar interior que
                brinda abrigo y suavidad incluso en los días más fríos. Su cierre
                frontal y bolsillo canguro suman comodidad y funcionalidad. Fabricado
                en una mezcla de algodón y poliéster que evita el desgaste prematuro,
                es la prenda perfecta para los fans de Night City que buscan destacar
                con un estilo urbano y gamer a la vez.
                </p>
                <p>$29.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={poleronmine} />
            <div className="card-body">
                <h5 className="card-title">Polerón Minecraft Creeper</h5>
                <p className="card-text">
                Con la icónica cara del Creeper estampada en el pecho, este polerón de
                tela afelpada por dentro combina comodidad y un diseño reconocible al
                instante por cualquier fanático de Minecraft. Su capucha ajustable y
                puños elásticos ayudan a mantener el calor en cualquier estación.
                Disponible en tallas para adolescentes y adultos, es una opción ideal
                tanto para el uso diario como para regalar a los seguidores más fieles
                del universo de bloques más famoso de los videojuegos.
                </p>
                <p>$27.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
        </div>
        </div>
  )
}
