/* iife para no contaminar el scope global */

(() => {
  "use strict";

  /** @function obtenerCampo
   * @param {string} id identificador del elemento a recuperar
   * @returns {HTMLElement|null}
   * @description Obtiene un nodo del DOM a través de su atributo id.
   */
  const obtenerCampo = (id) => {
    return document.getElementById(id);
  };

  /** @function esValorPositivo
   * @param {number} valor número a validar
   * @returns {boolean}
   * @description Indica si el valor es finito y mayor que cero.
   */
  const esValorPositivo = (valor) => {
    return typeof valor === "number" && Number.isFinite(valor) && valor > 0;
  };

  /** @function obtenerCategoriaImc
   * @param {number} imc índice de masa corporal calculado
  * @returns {string}
  * @description Devuelve la categoría OMS correspondiente al valor de IMC.
  */
  const obtenerCategoriaImc = (imc) => {
    if (imc < 18.5) return "bajo peso";
    if (imc < 25) return "peso saludable";
    if (imc < 30) return "sobrepeso";
    return "obesidad";
  };

  /** @function calcularImcInterno
   * @param {number} kg peso en kilogramos
   * @param {number} cm altura en centímetros
   * @returns {number}
   * @description Calcula el IMC redondeado a dos decimales a partir del peso y la altura.
   */
  const calcularImcInterno = (kg, cm) => {
    const metros = cm / 100;
    if (!esValorPositivo(metros)) return NaN; /* evita división por cero */
    return parseFloat((kg / (metros * metros)).toFixed(2));
  };

  /** @function calcularAguaInterno
   * @param {number} kg peso en kilogramos
   * @returns {number}
   * @description Calcula los litros sugeridos de agua usando 35 ml por kilogramo.
   */
  const calcularAguaInterno = (kg) => {
    return parseFloat(((kg * 35) / 1000).toFixed(2));
  };

  /** @function calcularCaloriasInterno
   * @param {string} sexo sexo declarado por la persona
   * @param {string} actividad nivel de actividad seleccionado
   * @param {number} kg peso en kilogramos
   * @param {number} cm altura en centímetros
   * @param {number} edad edad en años
   * @returns {number}
   * @description Calcula el gasto calórico estimado aplicando la fórmula de Mifflin-St Jeor y el factor de actividad.
   */
  const calcularCaloriasInterno = (sexo, actividad, kg, cm, edad) => {
    let base;

    if (sexo === "femenino") {
      base = 10 * kg + 6.25 * cm - 5 * edad - 161;
    } else {
      base = 10 * kg + 6.25 * cm - 5 * edad + 5;
    }

    const multiplicadores = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      intenso: 1.725,
    };

    let factor;

    if (multiplicadores[actividad]) {
      factor = multiplicadores[actividad];
    } else {
      factor = multiplicadores.sedentario;
    }

    return Math.round(base * factor);
  };

  /** @function mostrarMensaje
   * @param {string} id identificador del nodo de salida
   * @param {string} texto contenido a mostrar
   * @returns {void}
   * @description Escribe un mensaje en el nodo indicado sin usar alertas.
   */
  const mostrarMensaje = (id, texto) => {
    const salida = obtenerCampo(id);
    if (salida) salida.textContent = texto;
  };

  /** @function obtenerMensajeError
   * @param {string} idCampo identificador del campo asociado
   * @returns {HTMLElement|null}
   * @description Devuelve el elemento destinado a mostrar el mensaje de error del campo.
   */
  const obtenerMensajeError = (idCampo) => {
    return document.getElementById("error-" + idCampo);
  };

  /** @function limpiarErrorCampo
   * @param {string} idCampo identificador del campo a limpiar
   * @returns {void}
   * @description Quita la clase de error del campo y borra su mensaje asociado, si existe.
   */
  const limpiarErrorCampo = (idCampo) => {
    const campo = obtenerCampo(idCampo);
    if (!campo) return;
    campo.classList.remove("campo-error");
    const destino = obtenerMensajeError(idCampo);
    if (destino) destino.textContent = "";
  };

  /** @function aplicarErrorCampo
   * @param {string} idCampo identificador del campo con error
   * @param {string} mensaje texto a mostrar en el área de error
   * @returns {null}
   * @description Limpia el valor del campo, aplica la clase de error, muestra el mensaje y enfoca el elemento.
   */
  const aplicarErrorCampo = (idCampo, mensaje) => {
    const campo = obtenerCampo(idCampo);
    if (!campo) return null;
    if (Object.prototype.hasOwnProperty.call(campo, "value")) {
      campo.value = "";
    }
    if (campo.tagName === "SELECT") {
      campo.selectedIndex = 0;
    }
    campo.classList.add("campo-error");
    const destino = obtenerMensajeError(idCampo);
    if (destino) destino.textContent = mensaje;
    campo.focus();
    return null;
  };

  /** @function registrarResetCampo
   * @param {string} idCampo identificador del campo a inicializar
   * @returns {void}
   * @description Registra eventos para quitar el estado de error cuando el usuario modifica el campo.
   */
  const registrarResetCampo = (idCampo) => {
    const campo = obtenerCampo(idCampo);
    if (!campo) return;
    const handler = () => {
      limpiarErrorCampo(idCampo);
    };
    campo.addEventListener("input", handler);
    campo.addEventListener("change", handler);
  };

  /** @function validarEdadCampo
   * @param {string} idCampo identificador del campo de edad
   * @returns {number|null}
   * @description Valida que la edad sea un entero positivo dentro del rango 1-120.
   */
  const validarEdadCampo = (idCampo) => {
    const campo = obtenerCampo(idCampo);
    if (!campo) return null;
    const crudo = String(campo.value || "").trim();
    if (!crudo) {
      return aplicarErrorCampo(idCampo, "ingresá tu edad.");
    }
    if (!/^\d+$/.test(crudo)) {
      return aplicarErrorCampo(
        idCampo,
        "ingresá una edad sin puntos ni comas."
      );
    }
    const numero = parseInt(crudo, 10);
    if (!(numero > 0 && numero <= 120)) {
      return aplicarErrorCampo(idCampo, "ingresá una edad entre 1 y 120.");
    }
    limpiarErrorCampo(idCampo);
    campo.value = String(numero);
    return numero;
  };

  /** @function validarPesoCampo
   * @param {string} idCampo identificador del campo de peso
   * @returns {number|null}
   * @description Valida el peso ingresado (acepta decimales con punto y rango lógico).
   */
  const validarPesoCampo = (idCampo) => {
    const campo = obtenerCampo(idCampo);
    if (!campo) return null;

    const crudo = String(campo.value || "").trim();

    if (!crudo) {
      return aplicarErrorCampo(idCampo, "ingresá tu peso.");
    }

    if (crudo.includes(",")) {
      return aplicarErrorCampo(idCampo, "usá punto en lugar de coma.");
    }

    const numero = parseFloat(crudo);

    if (isNaN(numero)) {
      return aplicarErrorCampo(idCampo, "ingresá un peso numérico.");
    }

    if (numero <= 0 || numero > 999) {
      return aplicarErrorCampo(
        idCampo,
        "ingresá un peso dentro de 0 a 999 kg."
      );
    }

    limpiarErrorCampo(idCampo);
    campo.value = String(numero);
    return numero;
  };


  /** @function validarAlturaCampo
 * @param {string} idCampo identificador del campo de altura
 * @returns {number|null}
 * @description Valida la altura en metros (menor a 3) y la devuelve en centímetros.
 */
  const validarAlturaCampo = (idCampo) => {
    const campo = obtenerCampo(idCampo);
    if (!campo) return null;

    const crudo = String(campo.value || "").trim();

    if (!crudo) {
      return aplicarErrorCampo(idCampo, "ingresá tu altura.");
    }

    const reemplazado = crudo.replace(",", ".");

    const numero = parseFloat(reemplazado);

    if (isNaN(numero)) {
      return aplicarErrorCampo(
        idCampo,
        "ingresá tu altura en metros. ejemplo: 1.70"
      );
    }

    if (numero <= 0 || numero >= 3) {
      return aplicarErrorCampo(
        idCampo,
        "la altura debe ser mayor a 0 y menor a 3 metros."
      );
    }

    limpiarErrorCampo(idCampo);
    campo.value = reemplazado;
    return numero * 100;
  };


  /** @function validarSeleccionCampo
   * @param {string} idCampo identificador del select a validar
   * @param {string} mensajeError texto a mostrar en caso de error
   * @returns {string}
   * @description Comprueba que el select tenga una opción elegida y devuelve su valor.
   */
  const validarSeleccionCampo = (idCampo, mensajeError) => {
    const campo = obtenerCampo(idCampo);
    if (!campo) return "";
    if (!campo.value) {
      aplicarErrorCampo(idCampo, mensajeError);
      return "";
    }
    limpiarErrorCampo(idCampo);
    return campo.value;
  };

  /** @function mostrarError
   * @param {string} texto mensaje descriptivo del error
   * @param {string} [idCampoAFocar] identificador del campo afectado
   * @returns {void}
   * @description Muestra un error general o enfoca el campo problemático aplicando el mensaje correspondiente.
   */
  const mostrarError = (texto, idCampoAFocar) => {
    if (idCampoAFocar) {
      aplicarErrorCampo(idCampoAFocar, texto);
      return;
    }
  };

  /* registra listeners para limpiar errores al corregir */
  [
    "peso-imc",
    "altura-imc",
    "edad-imc",
    "peso-agua",
    "sexo-calorias",
    "actividad-calorias",
    "peso-calorias",
    "altura-calorias",
    "edad-calorias",
  ].forEach(registrarResetCampo);

  /** @function calcularImc
   * @returns {void}
   * @description Valida los campos del formulario de IMC y muestra el resultado con su categoría.
   */
  window.calcularImc = () => {
    const peso = validarPesoCampo("peso-imc");
    if (peso === null) return;

    const alturaCentimetros = validarAlturaCampo("altura-imc");
    if (alturaCentimetros === null) return;

    const edad = validarEdadCampo("edad-imc");
    if (edad === null) return;

    const imc = calcularImcInterno(peso, alturaCentimetros);
    if (!esValorPositivo(imc)) {
      mostrarError("no se pudo calcular el imc. verificá los datos.");
      return;
    }

    mostrarMensaje(
      "resultado-imc",
      `tu imc es ${imc} (${obtenerCategoriaImc(imc)}).`
    );
  };

  /** @function calcularAgua
   * @returns {void}
   * @description Valida el peso ingresado y calcula la hidratación sugerida en litros.
   */
  window.calcularAgua = () => {
    const peso = validarPesoCampo("peso-agua");
    if (peso === null) return;
    const litros = calcularAguaInterno(peso);
    mostrarMensaje("resultado-agua", `tu hidratación sugerida es ${litros} litros.`);
  };

  /** @function calcularCalorias
   * @returns {void}
   * @description Valida los campos del formulario y estima las calorías diarias según Mifflin-St Jeor.
   */
  window.calcularCalorias = () => {
    const sexo = validarSeleccionCampo("sexo-calorias", "seleccioná tu sexo.");
    if (!sexo) return;

    const actividad = validarSeleccionCampo(
      "actividad-calorias",
      "seleccioná tu nivel de actividad."
    );
    if (!actividad) return;

    const peso = validarPesoCampo("peso-calorias");
    if (peso === null) return;

    const alturaCentimetros = validarAlturaCampo("altura-calorias");
    if (alturaCentimetros === null) return;

    const edad = validarEdadCampo("edad-calorias");
    if (edad === null) return;

    const calorias = calcularCaloriasInterno(
      sexo,
      actividad,
      peso,
      alturaCentimetros,
      edad
    );
    mostrarMensaje("resultado-calorias", `necesitás alrededor de ${calorias} kcal por día.`);
  };
})();
