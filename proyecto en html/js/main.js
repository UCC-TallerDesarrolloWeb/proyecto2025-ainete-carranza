/* iife con arrow function para aislar el código del scope global */
(() => {
  "use strict";
  /** @function obtenerEl
    * @param {string} id identificador del elemento buscado
    * @returns {HTMLElement|null}
    * @description Obtiene un elemento del DOM a partir de su atributo id.
    */
  const obtenerEl = (id) => document.getElementById(id);
  /** @function obtenerMensajeError
   * @param {HTMLElement|null} campo elemento desde el cual buscar el mensaje
   * @returns {HTMLElement|null}
   * @description Devuelve el nodo destinado a mostrar el error asociado al campo indicado.
   */
  const obtenerMensajeError = (campo) => {
    if (campo) {
      return obtenerEl(`error-${campo.id}`);
    } else {
      return null;
    }
  };


  /** @function limpiarEstadoCampo
   * @param {HTMLElement|null} campo elemento a limpiar
   * @returns {void}
   * @description Quita la clase de error del campo y borra el mensaje asociado, si existe.
   */
  const limpiarEstadoCampo = (campo) => {
    if (!campo) return;
    campo.classList.remove('campo-error');
    const destino = obtenerMensajeError(campo);
    if (destino) destino.textContent = '';
  };

  /** @function marcarCampoError
   * @param {HTMLElement|null} campo campo inválido
   * @param {string} mensaje texto a mostrar en el área de error
   * @returns {void}
   * @description Limpia el valor del campo, marca su error visualmente, informa el mensaje y enfoca el elemento.
   */
  const marcarCampoError = (campo, mensaje) => {
    if (!campo) return;
    if (Object.prototype.hasOwnProperty.call(campo, 'value')) {
      campo.value = '';
    }
    if (campo.tagName === 'SELECT') {
      campo.selectedIndex = 0;
    }
    campo.classList.add('campo-error');
    const destino = obtenerMensajeError(campo);
    if (destino) destino.textContent = mensaje;
    campo.focus();
  };

  /** @function marcarEnlaceActivo
   * @returns {void}
   * @description Resalta el enlace del menú que corresponde a la página actual.
   */
  const marcarEnlaceActivo = () => {
    const listaMenu = obtenerEl('lista-menu');
    if (!listaMenu) return;

    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    Array.from(listaMenu.querySelectorAll('a')).forEach((enlace) => {
      const destino = enlace.getAttribute('href');
      if (destino === paginaActual) {
        enlace.classList.add('estado-activo');
      }
    });
  };

  /** @function iniciarRecetas
   * @returns {void}
   * @description Inicializa la página de recetas: filtros, búsqueda y renderizado dinámico de los detalles de cada receta.
   */
  const iniciarRecetas = () => {
    const paginaRecetas = obtenerEl('pagina-recetas');
    if (!paginaRecetas) return;

    const barraRecetas = paginaRecetas.querySelector('.barra-recetas');
    const buscadorRecetas = obtenerEl('buscador-recetas');
    let botonesFiltro = [];

    if (barraRecetas) {
      botonesFiltro = Array.from(
        barraRecetas.querySelectorAll('.boton.boton-filtro')
      );
    }
    const tarjetasReceta = Array.from(paginaRecetas.querySelectorAll('.tarjeta-receta'));
    const contenedorDetalle = obtenerEl('detalle-receta');
    const contenedorListado = paginaRecetas.querySelector('.rejilla-recetas');

    let filtroActivo = localStorage.getItem('filtroRecetas') || 'todas';
    let terminoBusqueda = '';

    const datosRecetas = {
      ensalada: {
        titulo: 'ensalada verde express',
        descripcion:
          'ideal para almuerzos ligeros o cenas rápidas. lista en menos de 10 minutos con ingredientes frescos y crocantes.',
        datos: ['10 minutos', '2 porciones', 'rápida &amp; económica'],
        imagen: {
          src: 'imagenes/image-ensalada.jpg',
          alt: 'bowl de ensalada verde con hojas, semillas y vinagreta'
        },
        ingredientes: [
          '2 tazas de hojas verdes (espinaca, rúcula, lechuga)',
          '1/2 pepino en rodajas finas',
          '1/2 palta en cubos',
          '2 cucharadas de semillas (chía, girasol, sésamo)',
          '1 cucharada de aceite de oliva',
          'jugo de medio limón',
          'sal y pimienta a gusto'
        ],
        pasos: [
          'lavá y secá las hojas verdes. colocalas en un bowl amplio.',
          'sumá el pepino y la palta cortados. mezclá con movimientos suaves.',
          'prepará la vinagreta mezclando aceite, jugo de limón, sal y pimienta.',
          'verté la vinagreta sobre la ensalada y espolvoreá las semillas antes de servir.'
        ]
      },
      'power-bowl': {
        titulo: 'power bowl proteico',
        descripcion:
          'un bowl completo con proteínas, carbohidratos y grasas saludables. perfecto después de entrenar o para un almuerzo consistente.',
        datos: ['25 minutos', '2 porciones', 'proteico'],
        imagen: {
          src: 'imagenes/imagen-bowl-proteico.jpg',
          alt: 'bowl con pollo grillado, quinoa y vegetales'
        },
        ingredientes: [
          '1 pechuga de pollo grillada en tiras',
          '1 taza de quinoa cocida',
          '1 taza de vegetales asados (zapallo, zanahoria, brócoli)',
          '1/2 palta en láminas',
          '2 cucharadas de hummus o yogur natural',
          'semillas a gusto',
          'sal, pimienta y aceite de oliva'
        ],
        pasos: [
          'cociná la quinoa según el paquete y dejala entibiar.',
          'grillá la pechuga condimentada con sal, pimienta y aceite de oliva.',
          'colocá la quinoa como base del bowl, sumá los vegetales asados y la palta.',
          'incorporá el pollo en tiras, coroná con hummus o yogur y espolvoreá semillas.'
        ]
      },
      batido: {
        titulo: 'batido energético',
        descripcion:
          'un licuado cremoso con carbohidratos y antioxidantes para arrancar el día con energía o recuperar después de entrenar.',
        datos: ['5 minutos', '1 porción grande', 'rápida'],
        imagen: {
          src: 'imagenes/imagen-batido-energetico.jpg',
          alt: 'batido de frutos rojos en vaso de vidrio'
        },
        ingredientes: [
          '1 banana madura',
          '1 taza de frutos rojos congelados',
          '2 cucharadas de avena instantánea',
          '200 ml de leche vegetal o descremada',
          '1 cucharadita de miel o edulcorante (opcional)',
          'hielo a gusto'
        ],
        pasos: [
          'colocá todos los ingredientes en la licuadora.',
          'licuá a velocidad alta durante 45 segundos hasta lograr una textura cremosa.',
          'ajustá el dulzor con miel o edulcorante si lo preferís.',
          'serví inmediatamente y decorá con semillas o frutos enteros.'
        ]
      },
      wrap: {
        titulo: 'wrap veggie crujiente',
        descripcion:
          'una opción vegetal, liviana y con mucha textura gracias a los garbanzos crocantes y las verduras frescas.',
        datos: ['15 minutos', '2 wraps', 'vegetariana'],
        imagen: {
          src: 'imagenes/imagen-wrap-veggie.jpg',
          alt: 'wrap vegetariano con vegetales frescos'
        },
        ingredientes: [
          '2 tortillas integrales medianas',
          '1 taza de garbanzos cocidos',
          '1/2 zanahoria rallada',
          '1/2 taza de hojas verdes',
          '2 cucharadas de hummus o queso untable',
          'jugo de medio limón, sal y pimienta'
        ],
        pasos: [
          'dorá los garbanzos en sartén con una pizca de sal hasta que queden crujientes.',
          'untá cada tortilla con hummus y agregá hojas verdes y zanahoria.',
          'sumá los garbanzos crujientes y rociá con unas gotas de limón.',
          'enrollá firme el wrap, cortalo al medio y serví.'
        ]
      },
      desayuno: {
        titulo: 'desayuno proteico',
        descripcion:
          'tostadas integrales con huevo y palta, un combo equilibrado para arrancar el día con energía y saciedad.',
        datos: ['12 minutos', '1 porción', 'proteico &amp; económico'],
        imagen: {
          src: 'imagenes/imagen-desayuno-proteico.jpg',
          alt: 'tostadas integrales con huevo y palta'
        },
        ingredientes: [
          '2 rebanadas de pan integral',
          '1 palta pequeña',
          '1 huevo',
          'semillas de sésamo o chía',
          'sal, pimienta y gotas de limón'
        ],
        pasos: [
          'tostá las rebanadas de pan hasta que queden bien crujientes.',
          'aplastá la palta con un toque de limón, sal y pimienta y untala sobre el pan.',
          'cociná el huevo a la plancha o pochá y colocalo encima de las tostadas.',
          'sumá semillas para aportar textura y serví inmediatamente.'
        ]
      },
      snack: {
        titulo: 'snack crocante',
        descripcion:
          'una mezcla horneada de frutos secos y garbanzos especiados. ideal para llevar en un frasco y tener energía entre comidas.',
        datos: ['30 minutos', '4 porciones', 'proteico &amp; rápido'],
        imagen: {
          src: 'imagenes/imagen-snack-crocante.jpg',
          alt: 'frutos secos y garbanzos especiados en frasco'
        },
        ingredientes: [
          '1 taza de garbanzos cocidos y secos',
          '1/2 taza de almendras',
          '1/2 taza de nueces',
          '1 cucharada de aceite de oliva',
          '1 cucharadita de pimentón dulce',
          '1/2 cucharadita de comino y sal'
        ],
        pasos: [
          'mezclá los garbanzos y frutos secos con el aceite y los condimentos.',
          'distribuí en una placa y horneá a 180 °c durante 20 minutos, revolviendo a mitad de cocción.',
          'dejá enfriar por completo para que queden bien crocantes.',
          'guardá en frascos herméticos y consumí dentro de la semana.'
        ]
      }
    };

    /* normaliza texto para comparar: minúsculas + sin acentos + trim */
    const normalizarTexto = (texto) =>
      (texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    /** @function ocultarDetalleReceta
     * @returns {void}
     * @description Vacía el contenido del detalle de receta, lo oculta y vuelve a mostrar el listado y la barra de filtros.
     */

    const ocultarDetalleReceta = () => {
      if (contenedorDetalle) {
        contenedorDetalle.innerHTML = '';
        contenedorDetalle.classList.add('estado-oculto');
      }
      if (contenedorListado) contenedorListado.classList.remove('estado-oculto');
      if (barraRecetas) barraRecetas.classList.remove('estado-oculto');
    };

    /** @function construirItems
     * @param {string[]} items colección de textos para la lista
     * @returns {string}
     * @description Genera el HTML de una lista desordenada a partir de sus ítems.
     */
    const construirItems = (items) =>
      items.map((item) => `<li>${item}</li>`).join('');

    /** @function construirPasos
 * @param {string[]} pasos Lista ordenada de instrucciones de la receta.
 * @returns {string}
 * @description Genera el HTML de los pasos de una receta en forma de lista,
 * numerando cada paso automáticamente y aplicando la clase visual correspondiente.
 */
    const construirPasos = (pasos) =>
      pasos
        .map(
          (paso, indice) =>
            `<li class="paso-receta"><strong>${indice + 1}.</strong> ${paso}</li>`
        )
        .join('');


    /** @function mostrarDetalleReceta
     * @param {string} id identificador de la receta a mostrar
     * @returns {void}
     * @description Renderiza el detalle de la receta solicitada y oculta la grilla de tarjetas.
     */
    const mostrarDetalleReceta = (id) => {
      if (!(contenedorDetalle && contenedorListado)) return;
      const receta = datosRecetas[id];
      if (!receta) {
        ocultarDetalleReceta();
        return;
      }

      const datosHtml = receta.datos
        .map((dato) => `<span>${dato}</span>`)
        .join('');
      const ingredientesHtml = construirItems(receta.ingredientes);
      const pasosHtml = construirPasos(receta.pasos);

      contenedorDetalle.innerHTML = `
        <header class="detalle-receta-encabezado">
          <h1>${receta.titulo}</h1>
          <p>${receta.descripcion}</p>
          <div class="datos-receta">${datosHtml}</div>
          <img
            class="detalle-receta-imagen"
            src="${receta.imagen.src}"
            alt="${receta.imagen.alt}"
          />
        </header>
        <section>
          <h2>ingredientes</h2>
          <ul>${ingredientesHtml}</ul>
        </section>
        <section>
          <h2>paso a paso</h2>
          <ol class="lista-pasos">${pasosHtml}</ol>
        </section>
        <a class="boton boton-contorno" href="recetas.html">← volver a recetas</a>
      `;
      contenedorDetalle.classList.remove('estado-oculto');
      contenedorListado.classList.add('estado-oculto');
      if (barraRecetas) barraRecetas.classList.add('estado-oculto');
    };
    /** @function obtenerIdRecetaDesdeUrl
    * @returns {string|null}
    * @description Obtiene el identificador de una receta leyendo la URL.
    * Lo busca únicamente en los parámetros Query (?id=...).
    * Devuelve null si no se encuentra.
    */
    const obtenerIdRecetaDesdeUrl = () => {
      let id = null;

      if (window.location.search) {
        const parametros = new URLSearchParams(window.location.search);
        id = parametros.get('id');
      }

      return id;
    };



    /** @function actualizarVistaRecetas
     * @returns {void}
     * @description Decide si se muestra el detalle de una receta o el listado general según la URL.
     */
    const actualizarVistaRecetas = () => {
      const id = obtenerIdRecetaDesdeUrl();
      if (id && datosRecetas[id]) {
        mostrarDetalleReceta(id);
      } else {
        ocultarDetalleReceta();
      }
    };

    /* aplica filtro por categoría y búsqueda por nombre */
    /** @function aplicarFiltros
     * @returns {void}
     * @description Ejecuta la lógica de filtrado por categoría y búsqueda sobre las tarjetas de recetas.
     */
    const aplicarFiltros = () => {
      tarjetasReceta.forEach((tarjeta) => {
        const categorias = tarjeta.getAttribute('data-categorias') || '';
        const nombre =
          tarjeta.querySelector('h3').textContent;

        const coincideFiltro =
          filtroActivo === 'todas' || categorias.indexOf(filtroActivo) !== -1;
        const coincideBusqueda =
          terminoBusqueda === '' || normalizarTexto(nombre).includes(terminoBusqueda);
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
        localStorage.setItem('filtroRecetas', filtroActivo);
        aplicarFiltros();
      });
    });

    /* restaurar estado visual del botón activo al cargar */
    botonesFiltro.forEach((boton) => {
      boton.classList.remove('estado-activo');
      if (boton.getAttribute('data-filtro') === filtroActivo) {
        boton.classList.add('estado-activo');
      }
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
    actualizarVistaRecetas();

  };

  /** @function iniciarContacto
   * @returns {void}
   * @description Valida lo básico del formulario solo al enviar (submit). Si todo está OK, redirige a gracias.html?ok=1.
   */
  const iniciarContacto = () => {
    const formulario = obtenerEl('formulario-contacto');
    if (!formulario) return;

    const nombre = obtenerEl('nombre-contacto');
    const correo = obtenerEl('correo-contacto');
    const motivo = obtenerEl('motivo-contacto');
    const mensaje = obtenerEl('mensaje-contacto');

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      if (!(nombre && correo && motivo && mensaje)) return;

      // limpiar errores previos (básico)
      [nombre, correo, motivo, mensaje].forEach(limpiarEstadoCampo);

      const valorNombre = nombre.value.trim();
      if (!valorNombre) return marcarCampoError(nombre, 'Ingresá tu nombre.');

      const valorCorreo = correo.value.trim();
      if (!valorCorreo) return marcarCampoError(correo, 'Ingresá tu correo.');

      // validación mínima de email (solo que tenga "@")
      if (!valorCorreo.includes('@')) {
        return marcarCampoError(correo, 'Ingresá un correo válido.');
      }

      if (!motivo.value) return marcarCampoError(motivo, 'Seleccioná un motivo.');

      const valorMensaje = mensaje.value.trim();
      if (!valorMensaje) return marcarCampoError(mensaje, 'Ingresá un mensaje.');

      // si todo está OK → mostrar mensaje de éxito y limpiar formulario
      const mensajeExito = obtenerEl('mensaje-exito-contacto');
      if (mensajeExito) {
        mensajeExito.classList.remove('estado-oculto');
        formulario.reset();
        setTimeout(() => {
          mensajeExito.classList.add('estado-oculto');
        }, 5000);
      }
    });
  };



  /** @function iniciarSitio
   * @returns {void}
   * @description Inicia los módulos principales del sitio cuando el DOM está disponible.
   */
  const iniciarSitio = () => {
    marcarEnlaceActivo();
    iniciarRecetas();
    iniciarContacto();
  };

  /* espera al dom si aún está cargando; si no, inicia de inmediato */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSitio);
  } else {
    iniciarSitio();
  }

})();
