import wsp from '../../image/wsp.png';
import correo from '../../image/correo.webp';

export const Header = () => {
  return (
    <div id="header">
        <div className="contact">
          <img alt="" className="logos" src={wsp} />
          <a className="wsp" href="https://wa.me/">
            +569 669 90 493
          </a>
          <img alt="" className="logos" src={correo} />
          <span>Leveluptienda@gmail.com</span>
        </div>
        <div className="location">
          <span>San Bernardo, Santiago Chile</span>
        </div>
    </div>
  )
}
