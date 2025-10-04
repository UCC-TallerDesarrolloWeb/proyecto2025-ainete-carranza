/* iife con arrow function para aislar el código del scope global */
(() => {
  "use strict";

  /* util: selecciona el primer nodo que coincida con el selector (opcionalmente dentro de un scope) */
  const seleccionar = (selector, scope) => (scope || document).querySelector(selector);

  /* util: selecciona todos los nodos que coincidan y los convierte en array nativo */
  const seleccionarTodos = (selector, scope) =>
    Array.prototype.slice.call((scope || document).querySelectorAll(selector));

  /* util: obtener elemento por id */
  const obtenerEl = (id) => document.getElementById(id);

  /* util: valida que el valor sea un número finito y positivo */
  const esNumeroPositivo = (valor) => {
    const numero = Number(valor);
    return Number.isFinite(numero) && numero > 0;
  };

  /* menú: toggle en móvil + cierre al click fuera + marca de enlace activo */
  const iniciarMenu = () => {
    const listaMenu = obtenerEl('lista-menu');
    const botonMenu = obtenerEl('boton-menu');
    if (!(listaMenu && botonMenu)) return;

    /* abre/cierra el menú en pantallas pequeñas */
    botonMenu.addEventListener('click', () => {
      listaMenu.classList.toggle('menu-abierto');
    });

    /* cierra el menú si se hace click fuera de él */
    document.addEventListener('click', (evento) => {
      if (!listaMenu.contains(evento.target) && !botonMenu.contains(evento.target)) {
        listaMenu.classList.remove('menu-abierto');
      }
    });

    /* resalta el enlace de la página actual */
    const paginaActual = window.location.pathname.split('/').pop();
    seleccionarTodos('a', listaMenu).forEach((enlace) => {
      const destino = enlace.getAttribute('href');
      if (destino === paginaActual) {
        enlace.classList.add('estado-activo');
      }
    });
  };

  /* recetas: búsqueda por texto + filtros por categoría (usa data-atributos) */
  const iniciarRecetas = () => {
    const paginaRecetas = obtenerEl('pagina-recetas');
    if (!paginaRecetas) return;

    const barraRecetas = paginaRecetas.querySelector('.barra-recetas');
    const buscadorRecetas = obtenerEl('buscador-recetas');
    const botonesFiltro = barraRecetas ? seleccionarTodos('.boton.boton-filtro', barraRecetas) : [];
    const tarjetasReceta = seleccionarTodos('.tarjeta-receta', paginaRecetas);

    let filtroActivo = 'todas';
    let terminoBusqueda = '';

    /* normaliza texto para comparar: minúsculas + sin acentos + trim */
    const normalizarTexto = (texto) =>
      (texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    /* aplica filtro por categoría y búsqueda por nombre */
    const aplicarFiltros = () => {
      tarjetasReceta.forEach((tarjeta) => {
        const categorias = tarjeta.getAttribute('data-categorias') || '';
        const nombre =
          tarjeta.getAttribute('data-nombre') || tarjeta.querySelector('h3').textContent;

        const coincideFiltro =
          filtroActivo === 'todas' || categorias.indexOf(filtroActivo) !== -1; /* se mantiene para compatibilidad amplia */

        const coincideBusqueda =
          terminoBusqueda === '' || normalizarTexto(nombre).indexOf(terminoBusqueda) !== -1;

        if (coincideFiltro && coincideBusqueda) {
          tarjeta.classList.remove('estado-oculto');
        } else {
          tarjeta.classList.add('estado-oculto');
        }
      });
    };

    /* click en botones de filtro: activa uno y desactiva los demás */
    botonesFiltro.forEach((boton) => {
      boton.addEventListener('click', () => {
        botonesFiltro.forEach((otroBoton) => otroBoton.classList.remove('estado-activo'));
        boton.classList.add('estado-activo');
        filtroActivo = boton.getAttribute('data-filtro') || 'todas';
        aplicarFiltros();
      });
    });

    /* input de búsqueda en vivo */
    if (buscadorRecetas) {
      buscadorRecetas.addEventListener('input', () => {
        terminoBusqueda = normalizarTexto(buscadorRecetas.value);
        aplicarFiltros();
      });
    }

    /* primer render con estado inicial */
    aplicarFiltros();
  };

  /* contacto: validación simple en cliente y redirección a página de gracias */
  const iniciarContacto = () => {
    const formulario = obtenerEl('formulario-contacto');
    if (!formulario) return;

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const nombre = obtenerEl('nombre-contacto');
      const correo = obtenerEl('correo-contacto');
      const motivo = obtenerEl('motivo-contacto');
      const mensaje = obtenerEl('mensaje-contacto');

      /* validaciones mínimas con mensajes en voseo y tildes correctas */
      if (!nombre.value.trim()) {
        alert('Ingresá tu nombre.');
        nombre.focus();
        return;
      }
      if (correo.value.indexOf('@') === -1) {
        alert('Ingresá un correo válido.');
        correo.focus();
        return;
      }
      if (!motivo.value) {
        alert('Seleccioná un motivo.');
        motivo.focus();
        return;
      }
      if (mensaje.value.trim().length < 10) {
        alert('Contanos un poco más en el mensaje.');
        mensaje.focus();
        return;
      }

      /* redirección con querystring para confirmar envío */
      const parametros = new URLSearchParams({ ok: '1' });
      window.location.href = `gracias.html?${parametros.toString()}`;
    });
  };

  /* gracias: muestra un mensaje alternativo si no viene desde el formulario */
  const iniciarGracias = () => {
    const mensaje = obtenerEl('mensaje-gracias');
    if (!mensaje) return;

    const consulta = new URLSearchParams(window.location.search);
    if (consulta.get('ok') !== '1') {
      mensaje.textContent = 'Ingresá desde el formulario para recibir novedades personalizadas.';
    }
  };

  /* arranque general del sitio: inicializa cada módulo en orden */
  const iniciarSitio = () => {
    iniciarMenu();
    iniciarRecetas();
    iniciarContacto();
    iniciarGracias();
  };

  /* espera al dom si aún está cargando; si no, inicia de inmediato */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSitio);
  } else {
    iniciarSitio();
  }

  /* api mínima expuesta para reutilizar en otros scripts o depurar */
  window.utilesNf = {
    seleccionar,
    seleccionarTodos,
    obtenerEl,
    esNumeroPositivo
  };
})();
