
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../image/logo.png';
import carrito from '../../image/carro.png';
import user from '../../image/user.webp';
import { Link } from 'react-router-dom';



interface NavbarProps {
  vcarrito: number;
  placeholder?: string;
}

export const Navbar = ({ vcarrito, placeholder = "Buscar" }: NavbarProps) => {

const [busqueda, setBusqueda] = useState("");
const navigate = useNavigate();

const buscarProductos = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  navigate(`/productos?q=${encodeURIComponent(busqueda.trim())}`);
};
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
                <Link to={'/juegosMesa'}>Juegos de mesa</Link>
              </li>
              <li>
                <Link to={'/merch'}>Merch</Link>
              </li>
            </ul>
          </li>
          <Link className="link" to={"/eventos"}>Eventos</Link>
          <Link className="link" to={"/tecnico"}>Servicio Tecnico</Link>
          
        </div>
        <form
        className="search-container"
        onSubmit={buscarProductos}
        >
          <input
          className="buscar"
          type="search"
          placeholder={placeholder}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          />
          
          <button className="btn-buscar" type="submit">
            Buscar
            </button>
        </form>

        <div className="dropes">

          <div className="dropdown">
            <Link to={'/Carro'}>
            <img alt="" className="btn-primary" id="user" src={carrito} />
            <ul className="dropdown-menu">
              <li>
                <span id="valorcarrito">${vcarrito = 0}</span>
              </li>
            </ul>
            </Link>
          </div>
          <div className="dropdown">
            <img alt="" className="btn-primary" id="user" src={user} />
            <ul className="dropdown-menu">
              <li>
                <Link to={"/IniciarSesion"}>Iniciar Sesion</Link>
              </li>
              <li>
                <Link to={"/registro"}>Registro</Link>
              </li>
              <li>
                <Link to={"/perfil"}>Perfil</Link>
              </li>
              <li>
                <Link to={"/"}>Cerrar Sesion</Link>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  )
}
