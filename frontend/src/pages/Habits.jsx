import { useState, useEffect } from "react";
import Button from "@components/Button";
import "@styles/Habits.scss";

const HABITOS_KEY = "nf_habitos";
const FECHA_KEY = "nf_habitos_fecha";

const habitosIniciales = [
  { id: "agua", texto: "Tomá 8 vasos de agua", custom: false },
  { id: "frutas", texto: "Comé 2 porciones de fruta", custom: false },
  { id: "pausa", texto: "Realicé una pausa activa", custom: false },
  { id: "planificacion", texto: "Planificá comidas del día", custom: false },
];

const Habits = () => {
  const [habitos, setHabitos] = useState([]);
  const [nuevoHabito, setNuevoHabito] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    cargarHabitos();
    actualizarFecha();
  }, []);

  const clonarHabitos = () => {
    return habitosIniciales.map(habito => ({ ...habito, completo: false }));
  };

  const cargarHabitos = () => {
    try {
      const guardados = localStorage.getItem(HABITOS_KEY);
      if (guardados) {
        const parsed = JSON.parse(guardados);
        setHabitos(parsed);
      } else {
        const iniciales = clonarHabitos();
        setHabitos(iniciales);
      }
    } catch (error) {
      console.error("Error al cargar hábitos:", error);
      setHabitos(clonarHabitos());
    }
  };

  const guardarHabitos = (datos) => {
    try {
      localStorage.setItem(HABITOS_KEY, JSON.stringify(datos));
      localStorage.setItem(FECHA_KEY, new Date().toISOString());
      actualizarFecha();
      setEstado("Progreso guardado correctamente.");
      setTimeout(() => setEstado(""), 2000);
    } catch (error) {
      console.error("Error al guardar hábitos:", error);
      setEstado("Error al guardar. Intentalo de nuevo.");
      setTimeout(() => setEstado(""), 2000);
    }
  };

  const actualizarFecha = () => {
    try {
      const fechaGuardada = localStorage.getItem(FECHA_KEY);
      if (fechaGuardada) {
        const fechaObj = new Date(fechaGuardada);
        setFecha(fechaObj.toLocaleString());
      } else {
        setFecha("Sin guardar");
      }
    } catch (error) {
      setFecha("Sin guardar");
    }
  };

  const toggleHabito = (id) => {
    const actualizados = habitos.map(habito =>
      habito.id === id ? { ...habito, completo: !habito.completo } : habito
    );
    setHabitos(actualizados);
  };

  const agregarHabito = () => {
    const texto = nuevoHabito.trim();
    if (!texto) {
      setEstado("Ingresá un hábito para agregar.");
      setTimeout(() => setEstado(""), 1500);
      return;
    }

    const nuevo = {
      id: `habito_${Date.now()}`,
      texto: texto,
      custom: true,
      completo: false,
    };

    const actualizados = [...habitos, nuevo];
    setHabitos(actualizados);
    setNuevoHabito("");
    setEstado("Hábito agregado.");
    setTimeout(() => setEstado(""), 1500);
  };

  const quitarHabito = (id) => {
    const actualizados = habitos.filter(habito => habito.id !== id);
    setHabitos(actualizados);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    guardarHabitos(habitos);
  };

  return (
    <main className="contenedor" id="pagina-habitos">
      <header className="encabezado-seccion">
        <h1>mis hábitos diarios</h1>
        <p className="texto-destacado">
          Seleccioná lo que cumpliste hoy, sumá hábitos personalizados y guardá
          tu progreso.
        </p>
      </header>

      <section className="panel-habitos panel-superficie" aria-labelledby="titulo-lista-habitos">
        <h2 id="titulo-lista-habitos">checklist saludable</h2>
        <form
          id="formulario-habitos"
          className="formulario-habitos"
          onSubmit={handleSubmit}
          aria-describedby="estado-habitos"
        >
          <ul className="lista-habitos" id="lista-habitos">
            {habitos.map((habito) => (
              <li key={habito.id} className="item-habito">
                <label htmlFor={habito.id} className="label-habito">
                  <input
                    type="checkbox"
                    id={habito.id}
                    name="habito"
                    checked={habito.completo}
                    onChange={() => toggleHabito(habito.id)}
                  />
                  <span>{habito.texto}</span>
                </label>
                {habito.custom && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => quitarHabito(habito.id)}
                  >
                    Quitar
                  </Button>
                )}
              </li>
            ))}
          </ul>

          <div className="acciones-habitos">
            <label htmlFor="entrada-habito" className="sr-only">
              agregar hábito
            </label>
            <input
              id="entrada-habito"
              name="nuevoHabito"
              type="text"
              placeholder="escribí un hábito nuevo"
              maxLength="60"
              value={nuevoHabito}
              onChange={(e) => setNuevoHabito(e.target.value)}
            />
            <Button type="button" variant="outline" onClick={agregarHabito}>
              agregar
            </Button>
          </div>

          <Button type="submit" variant="primary">
            guardar progreso
          </Button>
        </form>
        <p id="estado-habitos" className="estado-habitos" aria-live="polite">
          {estado}
        </p>
        <p className="texto-fecha-habitos">
          última actualización: <span id="fecha-habitos">{fecha}</span>
        </p>
      </section>
    </main>
  );
};

export default Habits;

