import logo from '../../image/logo.png';
import carrito from '../../image/carro.png';
import user from '../../image/user.webp';
import { Link } from 'react-router-dom';



interface NavbarProps {
  vcarrito: number;
}

export const Navbar = ({ vcarrito }: NavbarProps) => {
  return (
      <nav className="navbar" id="navbar">
        <div className="logo">
          <img src={logo} alt='Logo Empresa'/>
        </div>
        <div className="links" id="nav-links">
          <Link className="link" to={'/'}>Home</Link>
          <li className="dropdown">
            <Link className="drop" to="#">
              Categorias
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to={'/consolas'}>Consolas</Link>
              </li>
              <li>
                <Link to={'/accesorios'}>Accesorios</Link>
              </li>
              <li>
                <Link to={'/computadores'}>Computadores Gamer</Link>
              </li>
              <li>
                <Link to={'/sillas'}>Sillas Gamer</Link>
              </li>
              <li>
                <Link to={'/mouse'}>Mouse</Link>
              </li>
              <li>
                <Link to={'/mousepad'}>Mousepad</Link>
              </li>
              <li>
                <Link to={'/juegosMesa'}>Juegos de mesa</Link>
              </li>
              <li>
                <Link to={'/merch'}>Merch</Link>
              </li>
            </ul>
          </li>
          <Link className="link" to={"/eventos"}>Eventos</Link>
          <Link className="link" to={"/tecnico"}>
            Servicio Tecnico
          </Link>
        </div>
        <div className="dropes">

          <div className="dropdown">
            <img alt="" className="btn-primary" id="user" src={carrito} />
            <ul className="dropdown-menu">
              <li>
                <span id="valorcarrito">${vcarrito = 0}</span>
              </li>
            </ul>
          {/* <div className="carrito drop-menu">
            <a href="/carrito.html">
              <img alt="" className="btn-primary" id="user" src={carrito} />
            </a>
              <li>
              <span>{vcarrito = 0}</span>  
              </li> */}
          </div>
          <div className="dropdown">
            <img alt="" className="btn-primary" id="user" src={user} />
            <ul className="dropdown-menu">
              <li>
                <a href="/iniciarSesion.html">Iniciar Sesion</a>
              </li>
              <li>
                <a href="/registro.html">Registro</a>
              </li>
              <li>
                <a href="/perfil.html">Perfil</a>
              </li>
              <li>
                <a href="/index.html">Cerrar Sesion</a>
              </li>
            </ul>
          </div>
        </div>
</nav>
  )
}
