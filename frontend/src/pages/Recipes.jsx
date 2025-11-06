import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@components/Button";
import Card from "@components/Card";
import { recipesArray } from "@data/recipes";
import "@styles/Recipes.scss";

const Recipes = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtroActivo, setFiltroActivo] = useState('todas');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [recetaDetalle, setRecetaDetalle] = useState(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const receta = recipesArray.find(r => r.id === id);
      if (receta) {
        setRecetaDetalle(receta);
      } else {
        setRecetaDetalle(null);
      }
    } else {
      setRecetaDetalle(null);
    }
  }, [searchParams]);

  const normalizarTexto = (texto) => {
    return (texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  };

  const recetasFiltradas = recipesArray.filter(receta => {
    const coincideFiltro = filtroActivo === 'todas' || receta.categorias.includes(filtroActivo);
    const coincideBusqueda = terminoBusqueda === '' || normalizarTexto(receta.titulo).includes(normalizarTexto(terminoBusqueda));
    return coincideFiltro && coincideBusqueda;
  });

  const mostrarDetalle = (id) => {
    setSearchParams({ id });
    setRecetaDetalle(recipesArray.find(r => r.id === id));
  };

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

      <section className="rejilla-recetas" aria-labelledby="titulo-lista-recetas">
        <h2 id="titulo-lista-recetas" className="sr-only">
          listado de recetas
        </h2>
        {recetasFiltradas.map((receta) => (
          <Card key={receta.id} className="tarjeta-receta">
            <img src={receta.imagen.src} alt={receta.imagen.alt} />
            <h3>{receta.titulo}</h3>
            <p>{receta.descripcion}</p>
            <Button variant="outline" onClick={() => mostrarDetalle(receta.id)}>
              ver receta
            </Button>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Recipes;

