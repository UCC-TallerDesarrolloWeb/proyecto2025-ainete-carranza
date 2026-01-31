import "@styles/Button.scss";

/**
 * Componente Button reutilizable
 * @param {Object} props
 * @param {string} props.variant - Variante del botón: 'primary' | 'outline' | 'filter'
 * @param {string} props.type - Tipo de botón: 'button' | 'submit' | 'reset'
 * @param {function} props.onClick - Función a ejecutar al hacer click
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} props.className - Clases adicionales
 */
const Button = (props) => {
  const variant = props.variant || 'primary';
  const type = props.type || 'button';
  const onClick = props.onClick;
  const children = props.children;
  const className = props.className || '';

  let variantClass = 'boton-principal';

  if (variant === 'outline') {
    variantClass = 'boton-contorno';
  }

  if (variant === 'filter') {
    variantClass = 'boton-filtro';
  }

  const classes = 'boton ' + variantClass + ' ' + className;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;


