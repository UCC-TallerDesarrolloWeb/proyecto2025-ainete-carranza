import "@styles/Card.scss";

/**
 * Componente Card reutilizable
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} props.className - Clases adicionales
 */
const Card = ({ children, className = '', ...props }) => {
  const classes = `tarjeta panel-superficie ${className}`.trim();

  return (
    <article className={classes} {...props}>
      {children}
    </article>
  );
};

export default Card;

