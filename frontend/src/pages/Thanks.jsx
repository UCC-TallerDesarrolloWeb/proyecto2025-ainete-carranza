import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@components/Button";
import "@styles/Thanks.scss";

const Thanks = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const ok = searchParams.get('ok');
    if (ok !== '1') {
      setMensaje('Ingresá desde el formulario para recibir novedades personalizadas.');
    } else {
      setMensaje('Hemos recibido tu consulta y en breve nos pondremos en contacto contigo.');
    }
  }, [searchParams]);

  return (
    <main className="contenedor contenedor-chico">
      <section className="bloque-gracias panel-superficie" aria-labelledby="titulo-gracias">
        <h1 id="titulo-gracias">¡gracias por tu mensaje!</h1>
        <p id="mensaje-gracias" aria-live="polite">
          {mensaje}
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          volver al inicio
        </Button>
      </section>
    </main>
  );
};

export default Thanks;

