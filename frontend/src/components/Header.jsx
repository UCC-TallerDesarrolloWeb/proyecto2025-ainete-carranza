import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "@styles/Header.scss";

import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname === path;
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.navegacion')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="encabezado">
      <div className="marca">
        <a className="enlace-marca" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <img src={logo} alt="Nutrifit+ logo" className="logo-marca" />
          <span className="texto-marca">nutrifit+</span>
        </a>
      </div>
      <nav className="navegacion" aria-label="principal">
        <button
          className="boton-menu"
          id="boton-menu"
          aria-label="abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`lista-menu ${menuOpen ? 'menu-abierto' : ''}`} id="lista-menu">
          <li>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className={isActive('/') ? 'estado-activo' : ''}
            >
              inicio
            </a>
          </li>
          <li>
            <a
              href="/calculadoras"
              onClick={(e) => { e.preventDefault(); navigate('/calculadoras'); }}
              className={isActive('/calculadoras') ? 'estado-activo' : ''}
            >
              calculadoras
            </a>
          </li>
          <li>
            <a
              href="/habitos"
              onClick={(e) => { e.preventDefault(); navigate('/habitos'); }}
              className={isActive('/habitos') ? 'estado-activo' : ''}
            >
              hábitos
            </a>
          </li>
          <li>
            <a
              href="/recetas"
              onClick={(e) => { e.preventDefault(); navigate('/recetas'); }}
              className={isActive('/recetas') ? 'estado-activo' : ''}
            >
              recetas
            </a>
          </li>
          <li>
            <a
              href="/nosotros"
              onClick={(e) => { e.preventDefault(); navigate('/nosotros'); }}
              className={isActive('/nosotros') ? 'estado-activo' : ''}
            >
              nosotros
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
