import "@styles/Card.scss";

/** @component Card
 * @param {Object} props Propiedades del componente
 * @param {React.ReactNode} props.children Contenido interno de la tarjeta
 * @param {string} [props.className] Clases CSS adicionales
 * @returns {JSX.Element} Contenedor de tarjeta estilizado
 * @description Contenedor genérico con estilos de tarjeta (sombra, bordes, fondo).
 */
const Card = (props) => {
  const children = props.children;
  const className = props.className || '';

  const classes = 'tarjeta panel-superficie ' + className;

  return (
    <article className={classes}>
      {children}
    </article>
  );
};

export default Card;


