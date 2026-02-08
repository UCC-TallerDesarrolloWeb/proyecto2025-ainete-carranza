import { useState } from "react";
import "@styles/Input.scss";

/** @component Input
 * @param {Object} props Propiedades del componente
 * @param {string} props.id Identificador único del campo
 * @param {string} props.name Nombre del campo para formularios
 * @param {string} [props.type='text'] Tipo de input HTML
 * @param {string} [props.label] Texto de la etiqueta asociada
 * @param {string} [props.placeholder] Texto de ayuda visual
 * @param {string|number} props.value Valor actual del campo
 * @param {function} props.onChange Manejador de cambios
 * @param {string} [props.error] Mensaje de error a mostrar
 * @param {boolean} [props.required=false] Indica si el campo es obligatorio
 * @param {string} [props.className] Clases CSS adicionales
 * @returns {JSX.Element} Campo de entrada con etiqueta y manejo de errores
 * @description Componente de input controlado con soporte para estados de error y foco.
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
