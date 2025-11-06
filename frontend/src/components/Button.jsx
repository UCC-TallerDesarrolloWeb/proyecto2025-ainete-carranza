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
const Button = ({ variant = 'primary', type = 'button', onClick, children, className = '', ...props }) => {
  const baseClass = 'boton';
  const variantClass = `boton-${variant === 'outline' ? 'contorno' : variant === 'filter' ? 'filtro' : 'principal'}`;
  const classes = `${baseClass} ${variantClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

