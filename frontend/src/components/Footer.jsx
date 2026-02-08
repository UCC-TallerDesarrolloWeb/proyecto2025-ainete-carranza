import "@styles/Footer.scss";

/** @component Footer
 * @description Pie de página con información de copyright y enlaces secundarios.
 * @returns {JSX.Element} Elemento footer renderizado.
 */
const Footer = () => {
  return (
    <footer className="pie">
      <div className="pie-contenido">
        <p>&copy; 2026 nutrifit+.</p>
        <div className="pie-enlaces">
          <a href="/nosotros">contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
