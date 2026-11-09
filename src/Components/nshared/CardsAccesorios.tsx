import { Link } from "react-router-dom";
import headset from "../../image/headset.webp";
import teclado from "../../image/teclado.webp";
import microfono from "../../image/microfono.webp";
import volante from "../../image/volante.jpeg";
import baseenfriamiento from "../../image/base-enfriamiento.webp";
import logitech from "../../image/logitech.webp";
import razermouse from "../../image/razermouse.jpeg";
import padsteed from "../../image/padsteed.webp";
import padrazer from "../../image/padrazer.jpeg";

export const CardsAccesorios = () => {
  return (
    <div>
  <div className="titulo1">
    <h1>ACCESORIOS</h1>
  </div>
  <div className="accesorios">
    <div className="card">
      <img alt="..." className="card-img-top" src={headset} />
      <div className="card-body">
        <h5 className="card-title">Audífonos HyperX Cloud III</h5>
        <p className="card-text">
          Sumérgete por completo en cada partida con los HyperX Cloud III,
          diseñados para sesiones de juego prolongadas gracias a su espuma de
          memoria premium y diadema de acero reforzado. Su driver de 53mm
          entrega graves profundos y agudos nítidos, mientras que el micrófono
          desmontable con cancelación de ruido asegura una comunicación clara
          con tu equipo. Compatible con PS5, Xbox Series X|S, Nintendo Switch y
          PC mediante conexión de 3.5mm, este headset es la opción ideal para
          quienes buscan calidad de audio profesional sin sacrificar comodidad.
          Su diseño ergonómico y materiales resistentes garantizan durabilidad
          partida tras partida.
        </p>
        <p>$79.990</p>
        <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
      </div>
    </div>
    <div className="card">
      <img alt="..." className="card-img-top" src={teclado} />
      <div className="card-body">
        <h5 className="card-title">Teclado Mecánico Logitech G Pro X</h5>
        <p className="card-text">
          Lleva tu precisión al siguiente nivel con el Logitech G Pro X, un
          teclado mecánico compacto de formato TKL pensado para esports. Sus
          switches intercambiables en caliente te permiten personalizar la
          sensación de cada tecla sin necesidad de herramientas ni soldaduras.
          Construido con una placa superior de aluminio resistente y
          retroiluminación RGB LIGHTSYNC totalmente programable, combina estilo
          y rendimiento. Su diseño sin números facilita más espacio para el
          mouse, ideal para configuraciones competitivas de alto nivel.
        </p>
        <p>$99.990</p>
        <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
      </div>
    </div>
    
  </div>
  <div className="accesorios">
    
    <div className="Accesorios">
      <div className="card">
        <img alt="..." className="card-img-top" src={microfono} />
        <div className="card-body">
          <h5 className="card-title">Micrófono HyperX QuadCast S</h5>
          <p className="card-text">
            El HyperX QuadCast S ofrece captura de audio de estudio gracias a
            sus cuatro patrones polares seleccionables, ideales tanto para
            streaming en solitario como para podcasts grupales. Su montaje
            antichoque incorporado reduce las vibraciones y golpes del
            escritorio, evitando ruidos no deseados en la grabación. Cuenta con
            iluminación RGB personalizable y un control táctil de silencio en la
            parte superior, además de un filtro anti-pop integrado que mejora la
            claridad de la voz sin necesidad de accesorios adicionales.
          </p>
          <p>$119.990</p>
          <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
        </div>
      </div>
      <div className="card">
        <img alt="..." className="card-img-top" src={volante} />
        <div className="card-body">
          <h5 className="card-title">Volante Logitech G29 Driving Force</h5>
          <p className="card-text">
            El Logitech G29 lleva la simulación de carreras a otro nivel con
            retroalimentación de fuerza realista que responde a cada curva y
            superficie del circuito. Su construcción combina acero inoxidable y
            cuero cosido a mano en el volante, entregando una sensación premium
            en cada vuelta. Incluye pedalera de tres pedales con resortes
            ajustables y es compatible con PS5, PS4 y PC, permitiéndote alternar
            entre plataformas sin perder la calidad de conducción que
            caracteriza a la serie G.
          </p>
          <p>$249.990</p>
          <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
        </div>
      </div>
      <div className="card">
        <img
          alt="..."
          className="card-img-top"
          src={baseenfriamiento}
        />
        <div className="card-body">
          <h5 className="card-title">Base de Enfriamiento para PS5/Xbox</h5>
          <p className="card-text">
            Mantén tu consola funcionando a temperaturas óptimas con esta base
            de enfriamiento equipada con tres ventiladores silenciosos de alta
            capacidad. Su diseño vertical ahorra espacio en tu mueble mientras
            mejora la circulación de aire durante sesiones de juego prolongadas.
            Incluye puertos USB adicionales y compartimentos para almacenar
            hasta cuatro controles, convirtiéndose en una solución integral
            tanto para el rendimiento térmico como para el orden de tu setup.
          </p>
          <p>$34.990</p>
          <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
        </div>
      </div>

      <div>
        <div className="card">
          <img alt="..." className="card-img-top" src={logitech} />
          <div className="card-body">
            <h5 className="card-title">Mouse Logitech G502 X Plus</h5>
            <p className="card-text">
              El Logitech G502 X Plus incorpora switches ópticos LIGHTFORCE que
              eliminan por completo el rebote de clics, junto a un sensor HERO 25K
              capaz de alcanzar hasta 25.600 DPI con una precisión prácticamente
              perfecta. Su conectividad inalámbrica LIGHTSPEED asegura una respuesta
              sin latencia perceptible. Cuenta con iluminación RGB LIGHTSYNC
              personalizable, rueda de desplazamiento híbrida con modo libre y
              bloqueado, y hasta 13 botones programables, ofreciendo un control total
              para quienes buscan personalizar cada acción en juego.
            </p>
            <p>$99.990</p>
            <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
          </div>
        </div>
        <div className="card">
          <img alt="..." className="card-img-top" src={razermouse} />
          <div className="card-body">
            <h5 className="card-title">Mouse Razer DeathAdder V3 Pro</h5>
            <p className="card-text">
              El Razer DeathAdder V3 Pro mantiene la icónica forma ergonómica que lo
              hizo popular entre millones de jugadores, ahora con un peso de apenas 63
              gramos y sensor óptico Focus Pro 30K que ofrece una precisión de nivel
              profesional en cada movimiento. Su conexión inalámbrica HyperSpeed
              Wireless de segunda generación elimina la latencia frente al cableado,
              mientras que su batería de hasta 90 horas y switches ópticos de tercera
              generación lo convierten en una herramienta confiable para largas
              jornadas competitivas.
            </p>
            <p>$149.990</p>
            <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
          </div>
        </div>
        <div>
      <div className="card">
        <img alt="..." className="card-img-top" src={padsteed} />
        <div className="card-body">
          <h5 className="card-title">Mousepad SteelSeries QcK Prism XL</h5>
          <p className="card-text">
            El QcK Prism XL cubre todo tu escritorio con una superficie de tela
            optimizada para sensores ópticos de alta precisión, garantizando un
            deslizamiento constante en cada movimiento. Su base antideslizante de
            goma mantiene el mousepad firme incluso en los momentos de mayor
            tensión. Incorpora iluminación RGB perimetral personalizable que se
            sincroniza con el resto de tu setup, transformando tu espacio de juego
            en una experiencia visual tan inmersiva como funcional.
          </p>
          <p>$49.990</p>
          <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
        </div>
      </div>
      <div className="card">
        <img alt="..." className="card-img-top" src={padrazer} />
        <div className="card-body">
          <h5 className="card-title">Mousepad Razer Gigantus V2 XXL</h5>
          <p className="card-text">
            El Razer Gigantus V2 en su versión XXL ofrece una superficie extendida
            que cubre teclado y mouse simultáneamente, con una tela microtejida que
            combina control y velocidad para adaptarse a distintos estilos de juego.
            Sus costuras cosidas evitan el deshilachado con el uso prolongado. Su
            base de goma natural antideslizante asegura que el mousepad permanezca
            en su lugar durante las sesiones más intensas, mientras que su grosor
            uniforme entrega una superficie de deslizamiento consistente de borde a
            borde.
          </p>
          <p>$29.990</p>
          <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</div>
  )
}
