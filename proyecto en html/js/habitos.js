/* iife para aislar variables y evitar contaminar el scope global */
(function () {
  "use strict";

  /* claves de almacenamiento local */
  var claveHabitos = "nf_habitos";
  var claveFecha = "nf_habitos_fecha";

  /** @function obtenerEl
   * @param {string} id identificador del elemento requerido
   * @returns {HTMLElement|null}
   * @description Obtiene un nodo del DOM según su atributo id.
   */
 function obtenerEl(id) {
   return document.getElementById(id);
 }

  /* lista base de hábitos (con tildes corregidas) */
  var habitosIniciales = [
    { id: "agua", texto: "Tomá 8 vasos de agua", custom: false },
    { id: "frutas", texto: "Comé 2 porciones de fruta", custom: false },
    { id: "pausa", texto: "Realicé una pausa activa", custom: false },
    { id: "planificacion", texto: "Planificá comidas del día", custom: false },
  ];

  /** @function clonarHabitos
   * @returns {Array<Object>}
   * @description Crea una copia superficial de los hábitos base marcándolos como incompletos.
   */
 function clonarHabitos() {
    return habitosIniciales.map(function (habito) {
      var copia = {};
      for (var clave in habito) {
        if (Object.prototype.hasOwnProperty.call(habito, clave)) {
          copia[clave] = habito[clave];
        }
      }
      copia.completo = false;
      return copia;
    });
  }

  /** @function cargarHabitos
   * @returns {Array<Object>}
   * @description Recupera los hábitos guardados en localStorage o devuelve la copia base si no existen.
   */
 function cargarHabitos() {
    try {
      var guardados = localStorage.getItem(claveHabitos);
      if (guardados) {
        return JSON.parse(guardados);
      }
    } catch (error) {
      /* ignorar errores de parseo o bloqueo de storage */
    }
    return clonarHabitos();
  }

  /** @function guardarHabitos
   * @param {Array<Object>} datos hábitos a persistir
   * @returns {void}
   * @description Guarda los hábitos y la fecha de actualización en localStorage.
   */
 function guardarHabitos(datos) {
    localStorage.setItem(claveHabitos, JSON.stringify(datos));
    localStorage.setItem(claveFecha, new Date().toISOString());
  }

  /** @function mostrarFecha
   * @returns {void}
   * @description Actualiza el texto con la última fecha de guardado o “Sin guardar” si no existe.
   */
 function mostrarFecha() {
    var elementoFecha = obtenerEl("fecha-habitos");
    if (!elementoFecha) return;

    var crudo = localStorage.getItem(claveFecha);
    if (!crudo) {
      elementoFecha.textContent = "Sin guardar";
      return;
    }

    var fecha = new Date(crudo);
    elementoFecha.textContent = fecha.toLocaleString();
  }

  /** @function mostrarHabitos
   * @param {Array<Object>} datos hábitos a renderizar
   * @returns {void}
   * @description Dibuja la lista de hábitos con sus casillas y acciones correspondientes en pantalla.
   */
 function mostrarHabitos(datos) {
    var lista = obtenerEl("lista-habitos");
    if (!lista) return;

    lista.innerHTML = "";

    datos.forEach(function (habito) {
      var item = document.createElement("li");
      item.className = "item-habito";

      var etiqueta = document.createElement("label");
      etiqueta.setAttribute("for", habito.id);
      etiqueta.textContent = habito.texto;

      var casilla = document.createElement("input");
      casilla.type = "checkbox";
      casilla.id = habito.id;
      casilla.name = "habito";
      casilla.checked = Boolean(habito.completo);

      /* al cambiar la casilla, actualiza el estado del hábito */
      casilla.addEventListener("change", function () {
        habito.completo = casilla.checked;
      });

      item.appendChild(etiqueta);
      item.appendChild(casilla);

      /* si el hábito fue creado por el usuario, permite quitarlo */
      if (habito.custom) {
        var botonQuitar = document.createElement("button");
        botonQuitar.type = "button";
        botonQuitar.className = "boton boton-contorno";
        botonQuitar.textContent = "Quitar";
        botonQuitar.addEventListener("click", function () {
          var indice = datos.indexOf(habito);
          if (indice > -1) {
            datos.splice(indice, 1);
            mostrarHabitos(datos);
          }
        });
        item.appendChild(botonQuitar);
      }

      lista.appendChild(item);
    });
  }

  /** @function mostrarEstado
   * @param {string} texto mensaje a informar
   * @returns {void}
   * @description Escribe mensajes transitorios bajo el formulario para retroalimentar al usuario.
   */
 function mostrarEstado(texto) {
    var estado = obtenerEl("estado-habitos");
    if (estado) estado.textContent = texto;
  }

  /** @function iniciarHabitos
   * @returns {void}
   * @description Inicializa la pantalla de hábitos: carga datos, renderiza la lista y prepara los eventos de interacción.
   */
 function iniciarHabitos() {
    var formulario = obtenerEl("formulario-habitos");
    var botonAgregar = obtenerEl("boton-agregar-habito");
    var entradaHabito = obtenerEl("entrada-habito");

    /* evita doble inicialización si ya fue marcada */
    if (!formulario || formulario.getAttribute("data-ready") === "1") return;
    formulario.setAttribute("data-ready", "1");

    /* estado en memoria de la sesión */
    var datos = cargarHabitos();
    mostrarHabitos(datos);
    mostrarFecha();

    /* alta de hábitos personalizados */
    if (botonAgregar && entradaHabito) {
      botonAgregar.addEventListener("click", function () {
        var texto = entradaHabito.value.trim();
        if (!texto) {
          alert("Ingresá un hábito para agregar.");
          entradaHabito.focus();
          return;
        }

        var nuevo = {
          id: "habito_" + Date.now(),
          texto: texto,
          custom: true,
          completo: false,
        };

        datos.push(nuevo);
        entradaHabito.value = "";
        mostrarHabitos(datos);
        mostrarEstado("Hábito agregado.");
        setTimeout(function () {
          mostrarEstado("");
        }, 1500);
      });
    }

    /** @function guardar
     * @returns {void}
     * @description Persiste los hábitos actuales y muestra mensajes de confirmación junto a la fecha actualizada.
     */
    function guardar() {
      guardarHabitos(datos);
      mostrarFecha();
      mostrarEstado("Progreso guardado correctamente.");
      setTimeout(function () {
        mostrarEstado("");
      }, 2000);
    }

    /* submit del formulario (guardado) */
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      guardar();
    });

    /* por si el botón principal no es type="submit" en algunos navegadores */
    var botonGuardar = formulario.querySelector("button[type='submit']");
    if (botonGuardar) {
      botonGuardar.type = "button";
      botonGuardar.addEventListener("click", guardar);
    }
  }

  /* arranque seguro: espera dom listo si hace falta */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarHabitos);
  } else {
    iniciarHabitos();
  }

  /* api mínima expuesta para depurar o reutilizar */
  window.habitosNf = {
    cargarHabitos: cargarHabitos,
  };
})();
