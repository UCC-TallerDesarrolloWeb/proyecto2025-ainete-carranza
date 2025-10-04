/* iife para no contaminar el scope global */
(function () {
  "use strict";

  /* util: obtener un elemento por id */
  function obtenerCampo(id) {
    return document.getElementById(id);
  }

  /* util: leer número desde un input, aceptando coma o punto como separador */
  function leerNumero(id) {
    const campo = obtenerCampo(id);
    if (!campo) return NaN;
    return parseFloat(String(campo.value).replace(",", "."));
  }

  /* util: valida que sea un número positivo y finito */
  function esValorPositivo(valor) {
    return typeof valor === "number" && Number.isFinite(valor) && valor > 0;
  }

  /* util: categoriza el imc según la oms (rango estándar) */
  function obtenerCategoriaImc(imc) {
    if (imc < 18.5) return "bajo peso";
    if (imc < 25) return "peso saludable";
    if (imc < 30) return "sobrepeso";
    return "obesidad";
  }

  /* cálculo: índice de masa corporal */
  function calcularImcInterno(kg, cm) {
    const metros = cm / 100;
    if (!esValorPositivo(metros)) return NaN; /* evita división por cero */
    return parseFloat((kg / (metros * metros)).toFixed(2));
  }

  /* cálculo: hidratación sugerida (35 ml/kg → litros) */
  function calcularAguaInterno(kg) {
    return parseFloat(((kg * 35) / 1000).toFixed(2));
  }

  /* cálculo: calorías estimadas (mifflin-st jeor + factor de actividad) */
  function calcularCaloriasInterno(sexo, actividad, kg, cm, edad) {
    const base =
      sexo === "femenino"
        ? 10 * kg + 6.25 * cm - 5 * edad - 161
        : 10 * kg + 6.25 * cm - 5 * edad + 5;

    const multiplicadores = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      intenso: 1.725,
    };

    const factor = multiplicadores[actividad] ?? multiplicadores.sedentario;
    return Math.round(base * factor);
  }

  /* ui: muestra un mensaje en un nodo (éxito/resultado). no abre alert. */
  function mostrarMensaje(id, texto) {
    const salida = obtenerCampo(id);
    if (salida) salida.textContent = texto;
  }

  /* ui: muestra un error accesible y opcionalmente enfoca un campo */
  function mostrarError(texto, idCampoAFocar) {
    /* usamos alert sólo para errores (antes alertaba también en éxitos) */
    if (typeof alert === "function") alert(texto);
    if (idCampoAFocar) {
      const campo = obtenerCampo(idCampoAFocar);
      if (campo) campo.focus();
    }
  }

  /* expone la función bmi al scope global para los onclick del html */
  window.calcularImc = function () {
    const peso = leerNumero("peso-imc");
    const altura = leerNumero("altura-imc");
    const edad = leerNumero("edad-imc");

    if (!esValorPositivo(peso)) {
      mostrarError("ingresá un peso válido.", "peso-imc");
      return;
    }
    if (!esValorPositivo(altura)) {
      mostrarError("ingresá una altura válida.", "altura-imc");
      return;
    }
    if (!esValorPositivo(edad) || edad > 120) {
      mostrarError("ingresá una edad válida.", "edad-imc");
      return;
    }

    const imc = calcularImcInterno(peso, altura);
    if (!esValorPositivo(imc)) {
      mostrarError("no se pudo calcular el imc. verificá los datos.");
      return;
    }

    mostrarMensaje(
      "resultado-imc",
      `tu imc es ${imc} (${obtenerCategoriaImc(imc)}).`
    );
  };

  /* expone hidratación al scope global */
  window.calcularAgua = function () {
    const peso = leerNumero("peso-agua");
    if (!esValorPositivo(peso)) {
      mostrarError("ingresá un peso válido.", "peso-agua");
      return;
    }
    const litros = calcularAguaInterno(peso);
    mostrarMensaje("resultado-agua", `tu hidratación sugerida es ${litros} litros.`);
  };

  /* expone calorías al scope global */
  window.calcularCalorias = function () {
    const campoSexo = obtenerCampo("sexo-calorias");
    const campoActividad = obtenerCampo("actividad-calorias");
    const sexo = campoSexo ? campoSexo.value : "";
    const actividad = campoActividad ? campoActividad.value : "";
    const peso = leerNumero("peso-calorias");
    const altura = leerNumero("altura-calorias");
    const edad = leerNumero("edad-calorias");

    if (!sexo) {
      mostrarError("seleccioná tu sexo.", "sexo-calorias");
      return;
    }
    if (!actividad) {
      mostrarError("seleccioná tu nivel de actividad.", "actividad-calorias");
      return;
    }
    if (!esValorPositivo(peso)) {
      mostrarError("ingresá un peso válido.", "peso-calorias");
      return;
    }
    if (!esValorPositivo(altura)) {
      mostrarError("ingresá una altura válida.", "altura-calorias");
      return;
    }
    if (!esValorPositivo(edad) || edad > 120) {
      mostrarError("ingresá una edad válida.", "edad-calorias");
      return;
    }

    const calorias = calcularCaloriasInterno(sexo, actividad, peso, altura, edad);
    mostrarMensaje("resultado-calorias", `necesitás alrededor de ${calorias} kcal por día.`);
  };
})();
