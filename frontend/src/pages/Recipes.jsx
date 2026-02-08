import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "@components/Button";
import Card from "@components/Card";
import { getRecipes, getRecipeById } from "@api/recipesApi";
import "@styles/Recipes.scss";

/** @component Recipes
 * @description Componente principal para visualizar y filtrar recetas.
 * Maneja el estado de carga, errores, filtrado y detalle de receta.
 * Persiste el filtro seleccionado en localStorage.
 */
const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filtroActivo, setFiltroActivo] = useState(() => localStorage.getItem('filtroRecetas') || 'todas');

  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [recetaDetalle, setRecetaDetalle] = useState(null);
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** @effect
   * @description Carga las recetas desde la API al montar el componente.
   */
  useEffect(() => {
    const cargarRecetas = async () => {
      setLoading(true);
      setError(null);
      try {
        const datos = await getRecipes();
        if (datos && Array.isArray(datos)) {
          setRecetas(datos);
        } else {
          setError('No se pudieron cargar las recetas. Asegurate de que el servidor API esté corriendo en http://localhost:4000');
        }
      } catch (err) {
        console.error('Error al cargar recetas:', err);
        setError('No se pudieron cargar las recetas. Verificá que json-server esté corriendo: npx json-server --watch src/data/db.json --port 4000');
      } finally {
        setLoading(false);
      }
    };

    cargarRecetas();
  }, []);

  /** @function cargarYSetearReceta
   * @param {string} id Identificador de la receta a cargar.
   * @returns {Promise<void>}
   * @description Busca una receta por ID en la API y actualiza el estado.
   */
  const cargarYSetearReceta = async (id) => {
    setLoading(true);
    setError(null);

    const recetaApi = await getRecipeById(id);

    if (recetaApi) {
      setRecetaDetalle(recetaApi);
      setLoading(false);
      return;
    }

    else {
      setRecetaDetalle(null);
      setError('Receta no encontrada');
    }

    setLoading(false);
  };

  /** @effect
   * @description Sincroniza el detalle de la receta con el parámetro URL 'id'.
   */
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      cargarYSetearReceta(id);
    } else {
      setRecetaDetalle(null);
    }
  }, [searchParams, recetas]); // Nota: quitamos la dependencia circular implícita al extraer la lógica

  /** @function normalizarTexto
   * @param {string} texto Texto a normalizar.
   * @returns {string} Texto en minúsculas y sin acentos.
   * @description Normaliza una cadena para facilitar la búsqueda y comparación.
   */
  const normalizarTexto = (texto) => {
    return (texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  };

  /** @constant {Array} recetasFiltradas
   * @description Lista de recetas que cumplen con los criterios de filtro y búsqueda.
   */
  const recetasFiltradas = recetas.filter(receta => {
    const coincideFiltro = filtroActivo === 'todas' || (receta.categorias && receta.categorias.includes(filtroActivo));
    const coincideBusqueda = terminoBusqueda === '' || normalizarTexto(receta.titulo).includes(normalizarTexto(terminoBusqueda));
    return coincideFiltro && coincideBusqueda;
  });

  /** @effect
   * @description Guarda el filtro activo en localStorage cada vez que cambia.
   */
  useEffect(() => {
    localStorage.setItem('filtroRecetas', filtroActivo);
  }, [filtroActivo]);

  /** @function mostrarDetalle
   * @param {string} id Identificador de la receta.
   * @returns {Promise<void>}
   * @description Actualiza la URL con el ID de la receta para mostrar su detalle.
   */
  const mostrarDetalle = async (id) => {
    setSearchParams({ id });
    // Reusamos la lógica común sin alterar el estado de loading/error global
    await cargarYSetearReceta(id);
  };

  /** @function ocultarDetalle
   * @returns {void}
   * @description Limpia el parámetro ID de la URL y el estado de detalle.
   */
  const ocultarDetalle = () => {
    setSearchParams({});
    setRecetaDetalle(null);
  };

  if (recetaDetalle) {
    return (
      <main className="contenedor" id="pagina-recetas">
        <article className="detalle-receta panel-superficie">
          <header className="detalle-receta-encabezado">
            <h1>{recetaDetalle.titulo}</h1>
            <p>{recetaDetalle.descripcion}</p>
            <div className="datos-receta">
              {recetaDetalle.datos.map((dato, index) => (
                <span key={index}>{dato}</span>
              ))}
            </div>
            <img
              className="detalle-receta-imagen"
              src={recetaDetalle.imagen.src}
              alt={recetaDetalle.imagen.alt}
            />
          </header>
          <section>
            <h2>ingredientes</h2>
            <ul>
              {recetaDetalle.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>paso a paso</h2>
            <ol className="lista-pasos">
              {recetaDetalle.pasos.map((paso, index) => (
                <li key={index} className="paso-receta">
                  <strong>{index + 1}.</strong> {paso}
                </li>
              ))}
            </ol>
          </section>
          <Button variant="outline" onClick={ocultarDetalle}>
            ← volver a recetas
          </Button>
        </article>
      </main>
    );
  }

  return (
    <main className="contenedor" id="pagina-recetas">
      <header className="encabezado-seccion">
        <h1>recetas que inspiran</h1>
        <p className="texto-destacado">
          Elegimos preparaciones simples para cualquier día. Filtrá por lo que
          necesites y combiná ingredientes de tu cocina.
        </p>
      </header>

      <div className="barra-recetas">
        <label htmlFor="buscador-recetas" className="sr-only">
          buscar receta
        </label>
        <input
          id="buscador-recetas"
          className="buscador-recetas"
          type="search"
          placeholder="buscar receta..."
          aria-label="buscar receta por nombre"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <div className="barra-filtros" role="group" aria-label="filtrar recetas">
          <Button
            variant="filter"
            onClick={() => setFiltroActivo('todas')}
            className={filtroActivo === 'todas' ? 'estado-activo' : ''}
          >
            todas
          </Button>
          <Button
            variant="filter"
            onClick={() => setFiltroActivo('rapidas')}
            className={filtroActivo === 'rapidas' ? 'estado-activo' : ''}
          >
            rápidas
          </Button>
          <Button
            variant="filter"
            onClick={() => setFiltroActivo('economicas')}
            className={filtroActivo === 'economicas' ? 'estado-activo' : ''}
          >
            económicas
          </Button>
          <Button
            variant="filter"
            onClick={() => setFiltroActivo('proteicas')}
            className={filtroActivo === 'proteicas' ? 'estado-activo' : ''}
          >
            proteicas
          </Button>
        </div>
      </div>

      {loading && (
        <section className="rejilla-recetas" aria-labelledby="titulo-lista-recetas">
          <p className="texto-destacado">Cargando recetas...</p>
        </section>
      )}

      {error && !loading && (
        <section className="rejilla-recetas" aria-labelledby="titulo-lista-recetas">
          <p className="texto-destacado texto-error">
            {error}
          </p>
        </section>
      )}

      {!loading && !error && (
        <section className="rejilla-recetas" aria-labelledby="titulo-lista-recetas">
          <h2 id="titulo-lista-recetas" className="sr-only">
            listado de recetas
          </h2>
          {recetasFiltradas.length === 0 ? (
            <p className="texto-destacado">No se encontraron recetas con los filtros seleccionados.</p>
          ) : (
            recetasFiltradas.map((receta) => (
              <Card key={receta.id} className="tarjeta-receta">
                <img src={receta.imagen.src} alt={receta.imagen.alt} />
                <h3>{receta.titulo}</h3>
                <p>{receta.descripcion}</p>
                <Button variant="outline" onClick={() => mostrarDetalle(receta.id)}>
                  ver receta
                </Button>
              </Card>
            ))
          )}
        </section>
      )}
    </main>
  );
};

export default Recipes;

