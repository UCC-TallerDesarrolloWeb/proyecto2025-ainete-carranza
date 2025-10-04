/* iife para aislar variables y evitar contaminar el scope global */
(function () {
  "use strict";

  /* claves de almacenamiento local */
  var claveHabitos = "nf_habitos";
  var claveFecha = "nf_habitos_fecha";

  /* util: obtener elemento por id */
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

  /* crea una copia limpia de los hábitos base y setea completo=false */
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

  /* carga hábitos desde localstorage; si falla o no hay datos, usa los base */
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

  /* guarda hábitos y fecha de última actualización en localstorage */
  function guardarHabitos(datos) {
    localStorage.setItem(claveHabitos, JSON.stringify(datos));
    localStorage.setItem(claveFecha, new Date().toISOString());
  }

  /* muestra fecha amigable de última actualización (o “sin guardar”) */
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

  /* renderiza la lista de hábitos con sus casillas y botón “quitar” si es custom */
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

  /* muestra un texto de estado bajo el formulario (aria-live en el html) */
  function mostrarEstado(texto) {
    var estado = obtenerEl("estado-habitos");
    if (estado) estado.textContent = texto;
  }

  /* inicializa la pantalla de hábitos: carga, pinta, wirea eventos */
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

    /* guarda y actualiza timestamp + mensaje de estado */
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
