import { useState } from "react";
import "@styles/Input.scss";

/**
 * Componente Input reutilizable con validación
 * @param {Object} props
 * @param {string} props.type - Tipo de input
 * @param {string} props.id - ID del input
 * @param {string} props.name - Nombre del input
 * @param {string} props.label - Etiqueta del input
 * @param {string} props.placeholder - Placeholder
 * @param {string} props.value - Valor del input
 * @param {function} props.onChange - Función onChange
 * @param {function} props.onBlur - Función onBlur
 * @param {string} props.error - Mensaje de error
 * @param {boolean} props.required - Si es requerido
 * @param {string} props.className - Clases adicionales
 */
const Input = ({
  type = 'text',
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;
  const inputClasses = `input ${hasError ? 'campo-error' : ''} ${focused ? 'input--focused' : ''} ${className}`.trim();

  return (
    <div className="fila-formulario">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        onFocus={() => setFocused(true)}
        required={required}
        className={inputClasses}
        aria-describedby={hasError ? `error-${id}` : undefined}
        {...props}
      />
      {hasError && (
        <p
          id={`error-${id}`}
          className="mensaje-error"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

