import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import Card from "@components/Card";
import "@styles/Home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="contenedor">
      <section className="portada panel-superficie">
        <div className="texto-portada">
          <div className="etiqueta-portada">
            <img src="/logo.png" alt="emblema nutrifit+" />
            <span>bienvenidos</span>
          </div>
          <h1>nutrifit+</h1>
          <p>
            tu espacio para equilibrar energía y bienestar con herramientas
            accesibles, rutinas simples y recetas pensadas para cada día.
          </p>
          <Button variant="primary" onClick={() => navigate('/calculadoras')}>
            explorar calculadoras
          </Button>
        </div>
        <div className="imagen-portada tarjeta-branding">
          <div className="contenido-branding">
            <img src="/logo.png" alt="logo nutrifit" />
            <span>NutriFit+</span>
          </div>
        </div>
      </section>

      <section
        className="seccion-introduccion"
        aria-labelledby="titulo-introduccion"
      >
        <h2 id="titulo-introduccion">
          todo lo que necesitás para una vida equilibrada
        </h2>

        <div className="rejilla rejilla-duo">
          <Card>
            <h3>calculadoras intuitivas</h3>
            <p>
              conocé tu imc, la hidratación ideal y las calorías estimadas con
              pasos guiados y un panel visual.
            </p>
            <Button variant="outline" onClick={() => navigate('/calculadoras')}>
              calcular ahora
            </Button>
          </Card>

          <Card>
            <h3>recetas reales</h3>
            <p>
              ideas rápidas, económicas y proteicas con ingredientes cotidianos
              y fotos propias.
            </p>
            <Button variant="outline" onClick={() => navigate('/recetas')}>
              descubrir recetas
            </Button>
          </Card>
        </div>
      </section>

      <section className="seccion-beneficios" aria-labelledby="titulo-beneficios">
        <h2 id="titulo-beneficios">beneficios de nutrifit+</h2>
        <ul className="lista-beneficios">
          <li>contenido 100% en español claro y sin tecnicismos.</li>
          <li>herramientas digitales que acompañan cada hábito.</li>
          <li>soporte cercano para responder todas tus dudas.</li>
          <li>recetas y recursos pensados para el día a día.</li>
        </ul>
      </section>

      <section className="seccion-invitacion" aria-labelledby="titulo-invitacion">
        <div className="contenido-invitacion">
          <h2 id="titulo-invitacion">
            sumate a una comunidad que elige sentirse mejor
          </h2>
          <p>
            calculá tu plan diario y escribinos para
            sumarte a los talleres de nutrifit+. estamos para acompañarte.
          </p>
          <Button variant="primary" onClick={() => navigate('/nosotros')}>
            contactanos
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
