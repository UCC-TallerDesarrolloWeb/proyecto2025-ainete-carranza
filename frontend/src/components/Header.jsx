import { useNavigate, useLocation } from "react-router-dom";
import "@styles/Header.scss";

import logo from '../assets/logo.png';

/** @component Header
 * @description Componente de encabezado principal con navegación y logo.
 * @returns {JSX.Element} Elemento header con nav y logo.
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** @function getActiveClass
   * @param {string} path Ruta a comparar con la actual.
   * @returns {string} Clase CSS 'estado-activo' si coincide, o cadena vacía.
   * @description Determina si el enlace actual corresponde a la ruta activa.
   */
  const getActiveClass = (path) => {
    if (path === '/') {
      if (location.pathname === '/' || location.pathname === '/home') {
        return 'estado-activo';
      } else {
        return '';
      }
    }

    if (location.pathname === path) {
      return 'estado-activo';
    } else {
      return '';
    }
  };

  return (
    <header className="encabezado">
      <div className="marca">
        <a
          className="enlace-marca"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <img src={logo} alt="Nutrifit+ logo" className="logo-marca" />
          <span className="texto-marca">nutrifit+</span>
        </a>
      </div>

      <nav className="navegacion" aria-label="principal">
        <ul className="lista-menu" id="lista-menu">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className={getActiveClass('/')}
            >
              inicio
            </a>
          </li>

          <li>
            <a
              href="/calculadoras"
              onClick={(e) => {
                e.preventDefault();
                navigate('/calculadoras');
              }}
              className={getActiveClass('/calculadoras')}
            >
              calculadoras
            </a>
          </li>

          <li>
            <a
              href="/recetas"
              onClick={(e) => {
                e.preventDefault();
                navigate('/recetas');
              }}
              className={getActiveClass('/recetas')}
            >
              recetas
            </a>
          </li>

          <li>
            <a
              href="/nosotros"
              onClick={(e) => {
                e.preventDefault();
                navigate('/nosotros');
              }}
              className={getActiveClass('/nosotros')}
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
