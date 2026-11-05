import logo from '../../image/logo.png';
import carrito from '../../image/carro.png';
import user from '../../image/user.webp';


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
          <a className="link" href="/index.html">
            Home
          </a>
          <li className="dropdown">
            <a className="drop" href="#">
              Categorias
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="/consolas.html">Consolas</a>
              </li>
              <li>
                <a href="/accesorios.html">Accesorios</a>
              </li>
              <li>
                <a href="/computadores.html">Computadores Gamer</a>
              </li>
              <li>
                <a href="/sillas.html">Sillas Gamer</a>
              </li>
              <li>
                <a href="/mouse.html">Mouse</a>
              </li>
              <li>
                <a href="/mousepad.html">Mousepad</a>
              </li>
              <li>
                <a href="/juegosMesa.html">Juegos de mesa</a>
              </li>
              <li>
                <a href="/merch.html">Merch</a>
              </li>
            </ul>
          </li>
          <a className="link" href="/eventos.html">
            Eventos
          </a>
          <a className="link" href="/tecnico.html">
            Servicio Tecnico
          </a>
        </div>
        <div className="dropes">

          <div className="dropdown">
            <img alt="" className="btn-primary" id="user" src={carrito} />
            <ul className="dropdown-menu">
              <li>
                <span>{vcarrito = 0}</span>
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
