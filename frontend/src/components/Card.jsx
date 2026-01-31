import "@styles/Card.scss";

/**
 * Componente Card reutilizable
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} props.className - Clases adicionales
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


