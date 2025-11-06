import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input";
import Button from "@components/Button";
import "@styles/About.scss";

const About = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    motivo: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});

  const validateName = (value) => {
    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    if (!value.trim()) return 'Ingresá tu nombre.';
    if (!pattern.test(value.trim().replace(/\s+/g, ' '))) {
      return 'Ingresá solo letras y espacios.';
    }
    return '';
  };

  const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return 'Ingresá tu correo electrónico.';
    if (!pattern.test(value.trim())) {
      return 'Ingresá un correo válido.';
    }
    return '';
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const nombreError = validateName(formData.nombre);
    const correoError = validateEmail(formData.correo);

    if (nombreError) {
      newErrors.nombre = nombreError;
      setFormData(prev => ({ ...prev, nombre: '' }));
    }
    if (correoError) {
      newErrors.correo = correoError;
      setFormData(prev => ({ ...prev, correo: '' }));
    }
    if (!formData.motivo) {
      newErrors.motivo = 'Seleccioná un motivo.';
      setFormData(prev => ({ ...prev, motivo: '' }));
    }
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Ingresá tu mensaje.';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'Contanos un poco más en el mensaje (mínimo 10 caracteres).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(`${firstErrorField}-contacto`)?.focus();
      return;
    }

    // Redirigir a página de gracias
    navigate('/gracias?ok=1');
  };

  return (
    <main className="contenedor" id="pagina-nosotros">
      <section className="presentacion panel-superficie" aria-labelledby="titulo-nosotros">
        <div className="presentacion-contenido">
          <div className="etiqueta-portada">
            <img src="/logo.png" alt="emblema nutrifit+" />
            <span>quiénes somos</span>
          </div>
          <h1 id="titulo-nosotros">tu bienestar, nuestro proyecto favorito</h1>
          <p>
            nutrifit+ nació de una idea simple pero poderosa: la salud no
            debería ser complicada. durante los años de universidad, un grupo de
            amigos apasionados por la nutrición, el diseño y la programación se
            dio cuenta de que la mayoría de las herramientas online eran o
            demasiado técnicas o demasiado superficiales. así, en 2025, en
            córdoba, argentina, surgió nutrifit+, un espacio creado para unir
            ciencia y simplicidad.
          </p>
          <p>
            nuestro símbolo "+" representa ese paso extra que cada persona puede
            dar hacia una mejor versión de sí misma, sumando pequeños cambios
            diarios que, con el tiempo, generan grandes resultados. acá
            encontrarás calculadoras fáciles de usar, un módulo de hábitos
            sostenibles y recetas nutritivas con una meta clara: acompañarte sin
            que te sientas abrumado.
          </p>
        </div>
        <figure className="presentacion-imagen">
          <img
            src="/logo-ladotexto.png"
            alt="logotipo oficial de nutrifit+"
          />
        </figure>
      </section>

      <div className="destacado-nosotros panel-superficie" aria-label="resumen de la misión de nutrifit+">
        <h2>creado por estudiantes para acompañarte</h2>
        <ul>
          <li>herramientas simples que transforman información en acción.</li>
          <li>hábitos reales pensados para sostenerse en el tiempo.</li>
          <li>recetas y guías en español claro, sin fórmulas mágicas.</li>
        </ul>
      </div>

      <section className="seccion-enfoque panel-superficie" aria-labelledby="titulo-enfoque">
        <h2 id="titulo-enfoque">nuestro enfoque</h2>
        <p>
          en nutrifit+ creemos que el bienestar se construye día a día, con
          pasos pequeños pero constantes. por eso diseñamos herramientas simples
          y motivadoras: calculadoras que hablan en un idioma claro, un módulo
          de hábitos que se guarda en tu dispositivo y recetas que podés
          preparar con ingredientes cotidianos.
        </p>
        <p>
          no buscamos fórmulas mágicas ni restricciones extremas. preferimos
          acompañarte en tu camino, celebrando cada avance y recordándote que
          mejorar tu alimentación puede ser algo accesible, motivador y
          sostenible.
        </p>
      </section>

      <section className="seccion-contacto panel-superficie" aria-labelledby="titulo-contacto">
        <h2 id="titulo-contacto">escribinos</h2>
        <p>
          ¿querés contarnos tu experiencia, proponer una idea o consultar sobre
          nuevos contenidos? dejanos tu mensaje y te responderemos a la
          brevedad.
        </p>
        <form className="formulario-contacto" id="formulario-contacto" onSubmit={handleSubmit} noValidate>
          <Input
            id="nombre-contacto"
            name="nombre-contacto"
            type="text"
            label="nombre completo"
            placeholder="tu nombre"
            value={formData.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            error={errors.nombre}
            required
            maxLength="60"
            inputMode="text"
            autoComplete="name"
          />
          <Input
            id="correo-contacto"
            name="correo-contacto"
            type="email"
            label="correo electrónico"
            placeholder="tunombre@email.com"
            value={formData.correo}
            onChange={(e) => handleChange('correo', e.target.value)}
            error={errors.correo}
            required
            inputMode="email"
            autoComplete="email"
          />
          <div className="fila-formulario">
            <label htmlFor="motivo-contacto">motivo</label>
            <select
              id="motivo-contacto"
              name="motivo-contacto"
              value={formData.motivo}
              onChange={(e) => handleChange('motivo', e.target.value)}
              className={errors.motivo ? 'campo-error' : ''}
              aria-describedby={errors.motivo ? 'error-motivo-contacto' : undefined}
              required
            >
              <option value="">seleccionar</option>
              <option value="consultoria">consulta nutricional</option>
              <option value="capacitaciones">capacitaciones nutrifit+</option>
              <option value="alianzas">alianzas y prensa</option>
            </select>
            {errors.motivo && (
              <p id="error-motivo-contacto" className="mensaje-error" aria-live="polite">
                {errors.motivo}
              </p>
            )}
          </div>
          <div className="fila-formulario">
            <label htmlFor="mensaje-contacto">mensaje</label>
            <textarea
              id="mensaje-contacto"
              name="mensaje-contacto"
              rows="4"
              maxLength="500"
              placeholder="contanos cómo podemos ayudarte"
              value={formData.mensaje}
              onChange={(e) => handleChange('mensaje', e.target.value)}
              className={errors.mensaje ? 'campo-error' : ''}
              aria-describedby={errors.mensaje ? 'error-mensaje-contacto' : undefined}
              required
            />
            {errors.mensaje && (
              <p id="error-mensaje-contacto" className="mensaje-error" aria-live="polite">
                {errors.mensaje}
              </p>
            )}
          </div>
          <Button type="submit" variant="primary">
            enviar mensaje
          </Button>
        </form>
      </section>
    </main>
  );
};

export default About;

