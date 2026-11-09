import { Link } from "react-router-dom";
import noteAsus from "../../image/note-asus.jpeg";
import computador from "../../image/computador.jpg";
import legion from "../../image/legion.webp";
import hyperpc from "../../image/hyperpc.webp";

export const CardsComputers = () => {
  return (
    <div>
        <div className="titulo1">
            <h1>COMPUTADORES</h1>
        </div>
        <div className="computadores">
            <div className="card">
            <img alt="..." className="card-img-top" src={noteAsus} />
            <div className="card-body">
                <h5 className="card-title">Notebook ASUS ROG Strix G16</h5>
                <p className="card-text">
                El ASUS ROG Strix G16 combina un procesador Intel Core i7 de última
                generación con una tarjeta gráfica NVIDIA GeForce RTX 4060, entregando
                el rendimiento necesario para correr los títulos más exigentes en alta
                resolución y con ray tracing activado. Su pantalla de 16" con 165Hz de
                tasa de refresco y su sistema de refrigeración ROG Intelligent Cooling
                mantienen temperaturas óptimas incluso en sesiones de juego
                prolongadas, mientras que 16GB de RAM y un SSD de 1TB aseguran cargas
                rápidas y multitarea sin trabas.
                </p>
                <p>$1.199.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={computador} />
            <div className="card-body">
                <h5 className="card-title">PC Gamer MSI Aegis R2</h5>
                <p className="card-text">
                El MSI Aegis R2 llega listo para competir con un procesador Intel Core
                i5 de 12va generación y una tarjeta gráfica NVIDIA GeForce RTX 4070,
                ideal para gaming en 1440p con configuraciones gráficas al máximo. Su
                gabinete con panel lateral de vidrio templado permite lucir la
                iluminación RGB Mystic Light interna, mientras que 16GB de RAM DDR5 y
                un SSD NVMe de 1TB garantizan una experiencia fluida tanto en juegos
                como en tareas de streaming simultáneas.
                </p>
                <p>$1.449.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={legion} />
            <div className="card-body">
                <h5 className="card-title">Notebook Lenovo Legion 5 Pro</h5>
                <p className="card-text">
                El Lenovo Legion 5 Pro está equipado con un procesador AMD Ryzen 7 y
                una GPU NVIDIA GeForce RTX 4060, ofreciendo un equilibrio excelente
                entre potencia gráfica y eficiencia energética para sesiones de juego
                largas sin comprometer el rendimiento. Su pantalla QHD de 16" con
                165Hz y calibración de fábrica para color preciso lo hace igual de
                atractivo para diseño y edición, mientras que su teclado
                retroiluminado RGB por zonas y bisagras reforzadas soportan el uso
                intensivo diario.
                </p>
                <p>$1.299.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
            <div className="card">
            <img alt="..." className="card-img-top" src={hyperpc} />
            <div className="card-body">
                <h5 className="card-title">PC Gamer HYPERX Predator X</h5>
                <p className="card-text">
                Pensado para quienes buscan máximo rendimiento sin límites, el HYPERX
                Predator X integra un procesador Intel Core i9 junto a una tarjeta
                gráfica NVIDIA GeForce RTX 4080, capaz de mover los títulos más
                exigentes en 4K con trazado de rayos activado. Cuenta con 32GB de RAM
                DDR5, un SSD NVMe de 2TB y un sistema de refrigeración líquida AIO de
                240mm que mantiene el equipo estable incluso en las sesiones de
                overclocking más demandantes, todo dentro de un gabinete con flujo de
                aire optimizado.
                </p>
                <p>$2.199.990</p>
                <Link className="btn btn-primary" to={'/Carro'}>Añadir al carro</Link>
            </div>
            </div>
        </div>
        </div>
  )
}
