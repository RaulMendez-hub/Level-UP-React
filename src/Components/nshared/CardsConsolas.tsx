import { Link } from "react-router-dom"
import Ps5 from "../../image/ps5.webp"
import Xbox from "../../image/xbox.webp"
import Switch from "../../image/switch.webp"
import Deck from "../../image/deck.webp"

export const CardsConsolas = () => {
  return (
     <div>
        <div className="titulo1">
            <h1>CONSOLAS</h1>
        </div>
        <div className="consolas">
            <div className="card">
            <img alt="..." className="card-img-top" src={Ps5} />
            <div className="card-body">
                <h5 className="card-title">Playstation 5</h5>
                <p className="card-text">
                Experimenta el futuro de los videojuegos con la PS5. Disfruta de
                tiempos de carga ultrarrápidos gracias a su SSD de alta velocidad con
                1 TB de capacidad, y sumérgete en una experiencia única con respuesta
                háptica, gatillos adaptativos y audio 3D que te acercan más que nunca
                a la acción. Este bundle incluye dos juegos físicos de regalo: Astro
                Bot + Gran Turismo 7, para que disfrutes de títulos exclusivos y de
                alta calidad de inmediato. La tecnología ultrarrápida asegura una
                experiencia de juego fluida, manteniendo el ritmo con cada acción,
                mientras que los detalles gráficos impresionantes y el audio de 360
                grados te colocan en el centro del juego. Además, la PS5 es totalmente
                compatible con tu biblioteca de juegos de PS4 y te da acceso a juegos
                on-demand a través de PlayStation Plus, con una vasta selección que se
                actualiza cada mes. Aclaración: No incluye unidad óptica de disco.
                Esta puede adquirirse por separado y acoplarse a la consola.
                </p>
                <p>$799.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>
                Añadir al carro
                </Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={Xbox} />
            <div className="card-body">
                <h5 className="card-title">XBOX serie X</h5>
                <p className="card-text">
                La Xbox Series X se posiciona como una estrategia formidable y el
                pináculo del entretenimiento en casa. Diseñada para los jugadores más
                exigentes que buscan la mejor calidad de juego, ofrece una combinación
                imponente de velocidad, rendimiento inigualable y tecnología de
                vanguardia para dominar la próxima generación de consolas. Equipada
                con un procesador personalizado de 7 nm que aprovecha las eficientes
                microarquitecturas Zen 2 y RDNA 2 de AMD, proporciona una experiencia
                excepcionalmente fluida. Su asombroso diseño garantiza una respuesta
                ágil en los juegos más exigentes, estableciendo un nuevo estándar
                indiscutible en términos de potencia, gráficos y velocidad de carga.
                </p>
                <p>$679.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>
                Añadir al carro
                </Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={Switch} />
            <div className="card-body">
                <h5 className="card-title">Nintendo Switch 2</h5>
                <p className="card-text">
                Nintendo Switch 2 es la próxima generación de consolas híbridas de
                Nintendo, combinando juego portátil y de sobremesa con un rendimiento
                significativamente mejorado. Ofrece gráficos de alta definición, mayor
                velocidad de carga y retrocompatibilidad con títulos de Switch
                original. Con un diseño renovado y soporte para juegos exclusivos,
                promete revolucionar la experiencia gamer. ¡Prepárate para jugar como
                nunca antes!
                </p>
                <p>$549.900</p>
                <Link className="btn btn-primary" to={'/Carro'}>
                Añadir al carro
                </Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={Deck}/>
            <div className="card-body">
                <h5 className="card-title">Valve Steam Deck Oled</h5>
                <p className="card-text">
                El salto a la tecnología OLED lo cambia absolutamente todo. La Valve
                Steam Deck OLED no es solo una simple actualización de pantalla; es
                una reinvención magistral del dispositivo portátil para PC más
                aclamado del mundo. Con una nueva APU de 6nm infinitamente más
                eficiente, una batería de mayor capacidad y conectividad ultrarrápida,
                disfrutarás de sesiones de juego mucho más largas, descargas fugaces y
                un dispositivo notablemente más ligero y fresco en tus manos. Tu
                biblioteca de Steam nunca se vio tan bien.
                </p>
                <p>$649.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>
                Añadir al carro
                </Link>
            </div>
            </div>
        </div>
        </div>
  )
}
