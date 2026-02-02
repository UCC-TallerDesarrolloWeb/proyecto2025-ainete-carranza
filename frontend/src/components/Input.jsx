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
const Input = (props) => {
  const type = props.type || 'text';
  const id = props.id;
  const name = props.name;
  const label = props.label;
  const placeholder = props.placeholder;
  const value = props.value;
  const onChange = props.onChange;
  const error = props.error;
  const required = props.required || false;
  const className = props.className || '';
  const onBlur = props.onBlur;

  const [focused, setFocused] = useState(false);

  let hasError = false;
  if (error) {
    hasError = true;
  }

  let inputClasses = 'input';

  if (hasError) {
    inputClasses = inputClasses + ' campo-error';
  }

  if (focused) {
    inputClasses = inputClasses + ' input--focused';
  }

  if (className) {
    inputClasses = inputClasses + ' ' + className;
  }

  let ariaDescribedBy;
  if (hasError) {
    ariaDescribedBy = `error-${id}`;
  }

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
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) {
            onBlur(e);
          }
        }}
        required={required}
        className={inputClasses}
        aria-describedby={ariaDescribedBy}
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
