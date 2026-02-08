import "@styles/Button.scss";

/** @component Button
 * @param {Object} props Propiedades del componente
 * @param {string} [props.variant='primary'] Estilo visual ('primary', 'outline', 'filter')
 * @param {string} [props.type='button'] Tipo de botón HTML ('button', 'submit', 'reset')
 * @param {function} [props.onClick] Manejador del evento click
 * @param {React.ReactNode} props.children Contenido interno
 * @param {string} [props.className] Clases CSS adicionales
 * @returns {JSX.Element} Elemento de botón renderizado
 * @description Componente de botón reutilizable con variantes de estilo predefinidas.
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


