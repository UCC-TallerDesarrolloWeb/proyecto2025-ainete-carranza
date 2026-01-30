import { useState } from "react";
import Input from "@components/Input";
import Button from "@components/Button";
import "@styles/Calculators.scss";

const Calculators = () => {
  // IMC State
  const [imcData, setImcData] = useState({ peso: '', altura: '', edad: '' });
  const [imcErrors, setImcErrors] = useState({ peso: '', altura: '', edad: '' });
  const [imcResult, setImcResult] = useState('');

  // Agua State
  const [aguaData, setAguaData] = useState({ peso: '' });
  const [aguaErrors, setAguaErrors] = useState({ peso: '' });
  const [aguaResult, setAguaResult] = useState('');

  // Calorías State
  const [caloriasData, setCaloriasData] = useState({ sexo: '', actividad: '', peso: '', altura: '', edad: '' });
  const [caloriasErrors, setCaloriasErrors] = useState({ sexo: '', actividad: '', peso: '', altura: '', edad: '' });
  const [caloriasResult, setCaloriasResult] = useState('');
  // Validación de edad (0-120, entero positivo)
  const validateAge = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, error: 'Ingresá tu edad.' };
    if (!/^\d+$/.test(trimmed)) return { valid: false, error: 'Ingresá una edad sin puntos ni comas.' };
    const num = parseInt(trimmed, 10);
    if (num < 1 || num > 120) return { valid: false, error: 'Ingresá una edad entre 1 y 120.' };
    return { valid: true, value: num };
  };

  // Validación de peso (0-999, máximo 3 dígitos, sin coma)
  const validateWeight = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, error: 'Ingresá tu peso.' };
    if (trimmed.includes(',')) return { valid: false, error: 'Usá punto en lugar de coma.' };
    if (!/^\d{1,3}(\.\d{1,2})?$/.test(trimmed)) return { valid: false, error: 'Ingresá un peso válido (0-999).' };
    const num = parseFloat(trimmed);
    if (num <= 0 || num > 999) return { valid: false, error: 'Ingresá un peso dentro de 0 a 999 kg.' };
    return { valid: true, value: num };
  };

  // Validación de altura (menor a 3 metros)
  const validateHeight = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, error: 'Ingresá tu altura.' };
    const replaced = trimmed.replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(replaced)) return { valid: false, error: 'Ingresá tu altura en metros. Ejemplo: 1.70' };
    const num = parseFloat(replaced);
    if (num <= 0 || num >= 3) return { valid: false, error: 'La altura debe ser menor a 3 metros.' };
    return { valid: true, value: num };
  };

  const handleImcChange = (field, value) => {
    setImcData(prev => ({ ...prev, [field]: value }));
    if (imcErrors[field]) {
      setImcErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAguaChange = (field, value) => {
    setAguaData(prev => ({ ...prev, [field]: value }));
    if (aguaErrors[field]) {
      setAguaErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCaloriasChange = (field, value) => {
    setCaloriasData(prev => ({ ...prev, [field]: value }));
    if (caloriasErrors[field]) {
      setCaloriasErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const calcularImc = () => {
    const pesoValidation = validateWeight(imcData.peso);
    const alturaValidation = validateHeight(imcData.altura);
    const edadValidation = validateAge(imcData.edad);

    const errors = {};
    if (!pesoValidation.valid) {
      errors.peso = pesoValidation.error;
      setImcData(prev => ({ ...prev, peso: '' }));
    }
    if (!alturaValidation.valid) {
      errors.altura = alturaValidation.error;
      setImcData(prev => ({ ...prev, altura: '' }));
    }
    if (!edadValidation.valid) {
      errors.edad = edadValidation.error;
      setImcData(prev => ({ ...prev, edad: '' }));
    }

    if (Object.keys(errors).length > 0) {
      setImcErrors(errors);

      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(`${firstErrorField}-imc`);
      if (errorElement) errorElement.focus();
      return;
    }

    setImcErrors({});
    const alturaMetros = alturaValidation.value;
    const imc = pesoValidation.value / (alturaMetros * alturaMetros);
    const imcRounded = parseFloat(imc.toFixed(2));

    let categoria = '';
    if (imcRounded < 18.5) categoria = 'bajo peso';
    else if (imcRounded < 25) categoria = 'peso saludable';
    else if (imcRounded < 30) categoria = 'sobrepeso';
    else categoria = 'obesidad';

    setImcResult(`Tu IMC es ${imcRounded} (${categoria}).`);
  };

  const calcularAgua = () => {
    const pesoValidation = validateWeight(aguaData.peso);

    if (!pesoValidation.valid) {
      setAguaErrors({ peso: pesoValidation.error });
      setAguaData(prev => ({ ...prev, peso: '' }));
      document.getElementById('peso-agua')?.focus();
      return;
    }

    setAguaErrors({});
    const litros = (pesoValidation.value * 35) / 1000;
    const litrosRounded = parseFloat(litros.toFixed(2));
    setAguaResult(`Tu hidratación sugerida es ${litrosRounded} litros.`);
  };

  const calcularCalorias = () => {
    const errors = {};

    if (!caloriasData.sexo) {
      errors.sexo = 'Seleccioná tu sexo.';
      setCaloriasData(prev => ({ ...prev, sexo: '' }));
    }
    if (!caloriasData.actividad) {
      errors.actividad = 'Seleccioná tu nivel de actividad.';
      setCaloriasData(prev => ({ ...prev, actividad: '' }));
    }

    const pesoValidation = validateWeight(caloriasData.peso);
    if (!pesoValidation.valid) {
      errors.peso = pesoValidation.error;
      setCaloriasData(prev => ({ ...prev, peso: '' }));
    }

    const alturaValidation = validateHeight(caloriasData.altura);
    if (!alturaValidation.valid) {
      errors.altura = alturaValidation.error;
      setCaloriasData(prev => ({ ...prev, altura: '' }));
    }

    const edadValidation = validateAge(caloriasData.edad);
    if (!edadValidation.valid) {
      errors.edad = edadValidation.error;
      setCaloriasData(prev => ({ ...prev, edad: '' }));
    }

    if (Object.keys(errors).length > 0) {
      setCaloriasErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(`${firstErrorField}-calorias`)?.focus();
      return;
    }

    setCaloriasErrors({});

    const alturaCm = alturaValidation.value * 100;
    const base = caloriasData.sexo === 'femenino'
      ? 10 * pesoValidation.value + 6.25 * alturaCm - 5 * edadValidation.value - 161
      : 10 * pesoValidation.value + 6.25 * alturaCm - 5 * edadValidation.value + 5;

    const multiplicadores = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      intenso: 1.725,
    };

    const factor = multiplicadores[caloriasData.actividad] || 1.2;
    const calorias = Math.round(base * factor);
    setCaloriasResult(`Necesitás alrededor de ${calorias} kcal por día.`);
  };

  return (
    <main className="contenedor" id="pagina-calculadoras">
      <header className="encabezado-seccion">
        <h1>calculadoras saludables</h1>
        <p className="texto-destacado">
          Completá tus datos, presioná calcular y recibí los resultados.
        </p>
      </header>

      {/* Calculadora IMC */}
      <section className="seccion-calculadora panel-superficie" aria-labelledby="titulo-imc">
        <div className="bloque-calculadora">
          <div className="texto-calculadora">
            <h2 id="titulo-imc">calculadora de imc</h2>
            <form className="formulario-calculadora" id="formulario-imc" onSubmit={(e) => { e.preventDefault(); calcularImc(); }}>
              <Input
                id="peso-imc"
                name="imcPeso"
                type="number"
                label="peso (kg)"
                placeholder="ej: 68"
                value={imcData.peso}
                onChange={(e) => handleImcChange('peso', e.target.value)}
                error={imcErrors.peso}
                required
                inputMode="decimal"
                step="0.1"
                min="1"
              />
              <Input
                id="altura-imc"
                name="imcAltura"
                type="number"
                label="altura (m)"
                placeholder="ej: 1.68"
                value={imcData.altura}
                onChange={(e) => handleImcChange('altura', e.target.value)}
                error={imcErrors.altura}
                required
                inputMode="decimal"
                step="0.01"
                min="0.5"
                max="2.5"
              />
              <Input
                id="edad-imc"
                name="imcEdad"
                type="number"
                label="edad"
                placeholder="ej: 29"
                value={imcData.edad}
                onChange={(e) => handleImcChange('edad', e.target.value)}
                error={imcErrors.edad}
                required
                inputMode="numeric"
                min="1"
                max="120"
              />
              <Button type="button" variant="primary" onClick={calcularImc}>
                calcular imc
              </Button>
              {imcResult && (
                <output id="resultado-imc" className="resultado" aria-live="polite">
                  {imcResult}
                </output>
              )}
            </form>
          </div>
          <figure className="imagen-calculadora">
            <img src="/imagen-imc.png" alt="ilustración del cálculo del imc" />
          </figure>
        </div>
      </section>

      {/* Calculadora Agua */}
      <section className="seccion-calculadora panel-superficie" aria-labelledby="titulo-agua">
        <div className="bloque-calculadora">
          <div className="texto-calculadora">
            <h2 id="titulo-agua">hidratación sugerida</h2>
            <form className="formulario-calculadora" id="formulario-agua" onSubmit={(e) => { e.preventDefault(); calcularAgua(); }}>
              <Input
                id="peso-agua"
                name="aguaPeso"
                type="number"
                label="peso (kg)"
                placeholder="ej: 68"
                value={aguaData.peso}
                onChange={(e) => handleAguaChange('peso', e.target.value)}
                error={aguaErrors.peso}
                required
                inputMode="decimal"
                step="0.1"
                min="1"
              />
              <Button type="button" variant="primary" onClick={calcularAgua}>
                calcular agua
              </Button>
              {aguaResult && (
                <output id="resultado-agua" className="resultado" aria-live="polite">
                  {aguaResult}
                </output>
              )}
            </form>
          </div>
          <figure className="imagen-calculadora">
            <img src="/imagen-hidratacion.png" alt="ilustración de un vaso con agua" />
          </figure>
        </div>
      </section>

      {/* Calculadora Calorías */}
      <section className="seccion-calculadora panel-superficie" aria-labelledby="titulo-calorias">
        <div className="bloque-calculadora">
          <div className="texto-calculadora">
            <h2 id="titulo-calorias">calorías estimadas</h2>
            <form className="formulario-calculadora" id="formulario-calorias" onSubmit={(e) => { e.preventDefault(); calcularCalorias(); }}>
              <div className="rejilla-formulario">
                <div className="fila-formulario">
                  <label htmlFor="sexo-calorias">sexo</label>
                  <select
                    id="sexo-calorias"
                    name="calSexo"
                    value={caloriasData.sexo}
                    onChange={(e) => handleCaloriasChange('sexo', e.target.value)}
                    className={caloriasErrors.sexo ? 'campo-error' : ''}
                    aria-describedby={caloriasErrors.sexo ? 'error-sexo-calorias' : undefined}
                    required
                  >
                    <option value="">seleccionar</option>
                    <option value="femenino">femenino</option>
                    <option value="masculino">masculino</option>
                  </select>
                  {caloriasErrors.sexo && (
                    <p id="error-sexo-calorias" className="mensaje-error" aria-live="polite">
                      {caloriasErrors.sexo}
                    </p>
                  )}
                </div>
                <div className="fila-formulario">
                  <label htmlFor="actividad-calorias">actividad</label>
                  <select
                    id="actividad-calorias"
                    name="calActividad"
                    value={caloriasData.actividad}
                    onChange={(e) => handleCaloriasChange('actividad', e.target.value)}
                    className={caloriasErrors.actividad ? 'campo-error' : ''}
                    aria-describedby={caloriasErrors.actividad ? 'error-actividad-calorias' : undefined}
                    required
                  >
                    <option value="">seleccionar</option>
                    <option value="sedentario">sedentario</option>
                    <option value="ligero">ligero (1-3 días)</option>
                    <option value="moderado">moderado (3-5 días)</option>
                    <option value="intenso">intenso (6-7 días)</option>
                  </select>
                  {caloriasErrors.actividad && (
                    <p id="error-actividad-calorias" className="mensaje-error" aria-live="polite">
                      {caloriasErrors.actividad}
                    </p>
                  )}
                </div>
              </div>
              <div className="rejilla-formulario">
                <Input
                  id="peso-calorias"
                  name="calPeso"
                  type="number"
                  label="peso (kg)"
                  placeholder="ej: 68"
                  value={caloriasData.peso}
                  onChange={(e) => handleCaloriasChange('peso', e.target.value)}
                  error={caloriasErrors.peso}
                  required
                  inputMode="decimal"
                  step="0.1"
                  min="1"
                />
                <Input
                  id="altura-calorias"
                  name="calAltura"
                  type="number"
                  label="altura (m)"
                  placeholder="ej: 1.68"
                  value={caloriasData.altura}
                  onChange={(e) => handleCaloriasChange('altura', e.target.value)}
                  error={caloriasErrors.altura}
                  required
                  inputMode="decimal"
                  step="0.01"
                  min="0.5"
                  max="2.5"
                />
                <Input
                  id="edad-calorias"
                  name="calEdad"
                  type="number"
                  label="edad"
                  placeholder="ej: 29"
                  value={caloriasData.edad}
                  onChange={(e) => handleCaloriasChange('edad', e.target.value)}
                  error={caloriasErrors.edad}
                  required
                  inputMode="numeric"
                  min="1"
                  max="120"
                />
              </div>
              <Button type="button" variant="primary" onClick={calcularCalorias}>
                calcular calorías
              </Button>
              {caloriasResult && (
                <output id="resultado-calorias" className="resultado" aria-live="polite">
                  {caloriasResult}
                </output>
              )}
            </form>
          </div>
          <figure className="imagen-calculadora">
            <img src="/imagen-calorias.jpg" alt="ilustración de estimación calórica" />
          </figure>
        </div>
      </section>
    </main>
  );
};

export default Calculators;

