
import wolverine from '../../image/1.webp';
import gta from '../../image/2.webp';
import pc from '../../image/3.webp';
import pc2 from '../../image/4.webp';

export const Carousel = () => {
  return (
    <div>
      <div className="titulo1">
        <h1>BIENVENIDOS A LEVEL UP</h1>
      </div>
      <div
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        id="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              alt="Wolverine"
              className="d-flex w-100 h-50 mx-auto"
              src={wolverine}
            />
          </div>
          <div className="carousel-item">
            <img
              alt="GTA 6"
              className="d-flex w-100 h-50 mx-auto"
              src={gta}
            />
          </div>
          <div className="carousel-item">
            <img
              alt="PC"
              className="d-flex w-100 h-50 mx-auto"
              src={pc}
            />
          </div>
          <div className="carousel-item">
            <img
              alt="PC"
              className="d-flex w-100 h-50 mx-auto"
              src={pc2}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
