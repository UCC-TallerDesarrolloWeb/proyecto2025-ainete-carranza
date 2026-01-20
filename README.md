# NutriFit

## Índice
- [Autores](#-autores)
- [Descripción del proyecto](#-descripción-del-proyecto)
- [Link del sitio publicado](#-link-del-sitio-publicado)
- [Contenido de la página](#-contenido-de-la-página)
- [Sketch y Wireframe](#-sketch-y-wireframe)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Funcionalidades JavaScript](#-funcionalidades-javascript)
- [Accesibilidad](#-accesibilidad)
- [Requisitos cumplidos del proyecto](#-requisitos-cumplidos-del-proyecto)
- [Cómo ver localmente](#-cómo-ver-localmente)
- [Segunda Parte del Proyecto - Migración a React + Vite](#segunda-parte-del-proyecto---migración-a-react--vite)
- [Créditos](#-créditos)


### Cómo ver localmente
```bash
git clone https://github.com/UCC-TallerDesarrolloWeb/proyecto2025-ainete-carranza.git
cd proyecto2025-ainete-carranza
# Abrí index.html en tu navegador
```

## Autores
- **Tobías Ainete**
- **Alejo Carranza**

---

## Descripción del proyecto
**NutriFit** es una página web orientada a promover hábitos saludables, alimentación balanceada y ejercicio físico.  
El sitio ofrece recetas saludables, consejos de nutrición, una calculadora de calorías y una sección con hábitos recomendados para mejorar la calidad de vida.

---

## Link del sitio publicado
[https://ucc-tallerdesarrolloweb.github.io/proyecto2025-ainete-carranza/](https://ucc-tallerdesarrolloweb.github.io/proyecto2025-ainete-carranza/)

## Contenido de la página
- **Inicio:** presentación del proyecto y objetivos de NutriFit.  
- **Hábitos:** consejos para incorporar una rutina saludable.  
- **Recetas:** platos balanceados con ingredientes y pasos detallados.  
- **Calculadoras:** herramientas para calcular IMC o calorías diarias.  
- **Nosotros:** información sobre los autores y propósito del proyecto.  
- **Página de agradecimiento:** confirmación tras enviar formularios.

---

## Sketch y Wireframe
- 📂 Carpeta: `/Sketch`
  - Contiene los bocetos iniciales (versión Desktop y Mobile).
- 📂 Carpeta: `/Wireframe`
  - Contiene los prototipos digitales realizados en Figma o Canva.

---

## Tecnologías utilizadas
| Tecnología | Uso |
|-------------|-----|
| **HTML5** | Estructura del contenido |
| **CSS3** | Diseño y estilos |
| **JavaScript** | Funcionalidad e interactividad |
| **Google Fonts** | Tipografía personalizada |

---

## Funcionalidades JavaScript
- Validación de inputs (control de datos ingresados por el usuario).  
- Cálculo automático en las secciones de **Calculadoras**.  
- Alertas y mensajes de error personalizados.  
- Limpieza automática de campos con datos inválidos.

---

## Accesibilidad
- Todas las imágenes incluyen el atributo `alt`.  
- Todos los inputs están asociados a un `label` con atributo `for`.  
- Contraste de colores y tamaños de fuente legibles.

---

## Requisitos cumplidos del proyecto
- [x] Sketch y Wireframe (desktop + mobile)
- [x] Navegación entre todas las páginas
- [x] HTML semántico con etiquetas `<header>`, `<nav>`, `<main>`, `<footer>`
- [x] Estilos en archivo CSS externo
- [x] Funciones JS documentadas con **JSDoc**
- [x] Publicación en GitHub Pages

---

## Licencia
Proyecto académico realizado para la **Universidad Católica de Córdoba**, en el marco de la materia **Taller de Desarrollo Web (2025)**.

---

# Segunda Parte del Proyecto - Migración a React + Vite

## Descripción de la Segunda Parte

Durante esta segunda etapa del proyecto, se migró la estructura original desarrollada en **HTML, CSS y JavaScript puro** hacia un entorno moderno con **React + Vite**.  

El objetivo fue aplicar buenas prácticas de modularización, reutilización de componentes y validaciones en tiempo real.  

Se mantuvo la estética y la lógica del proyecto original, adaptándola al paradigma de componentes de React.  

Además, se incorporaron validaciones de formularios, manejo de estados con Hooks, almacenamiento local con LocalStorage y rutas dinámicas mediante React Router DOM.  

El resultado es un proyecto más escalable, organizado y acorde a los estándares de desarrollo web actuales.

---

## Contenido de la página (React)

| Página | Secciones | Descripción |
|--------|-----------|-------------|
| **Inicio** (`/` o `/home`) | Header | Logo y navegación principal con links a Calculadoras, Hábitos, Recetas y Nosotros. Menú responsive con hamburguesa. |
| | Portada | Mensaje principal de bienvenida con logo y botón para explorar calculadoras. |
| | Introducción | Tres cards destacando calculadoras intuitivas, hábitos que suman y recetas reales. |
| | Beneficios | Lista de beneficios de Nutrifit+ (contenido en español, herramientas digitales, soporte, recursos). |
| | Invitación | Llamado a acción para contactarse y sumarse a la comunidad. |
| | Footer | Copyright y link a contacto. |
| **Calculadoras** (`/calculadoras`) | Header | Igual al de inicio. |
| | Encabezado de sección | Título y descripción de las calculadoras disponibles. |
| | Calculadora de IMC | Formulario para calcular Índice de Masa Corporal (peso, altura, edad) con validaciones y resultado con categoría. |
| | Calculadora de Hidratación | Formulario para calcular litros de agua sugeridos según peso. |
| | Calculadora de Calorías | Formulario completo (sexo, actividad, peso, altura, edad) para estimar calorías diarias con fórmula Mifflin-St Jeor. |
| | Footer | Igual al de inicio. |
| **Hábitos** (`/habitos`) | Header | Igual al de inicio. |
| | Encabezado de sección | Título y descripción del módulo de hábitos. |
| | Checklist de hábitos | Lista de hábitos saludables predefinidos con checkboxes para marcar cumplimiento. |
| | Agregar hábito | Campo de entrada para agregar hábitos personalizados. |
| | Guardar progreso | Botón para guardar el estado actual en LocalStorage con fecha de última actualización. |
| | Footer | Igual al de inicio. |
| **Recetas** (`/recetas`) | Header | Igual al de inicio. |
| | Encabezado de sección | Título y descripción del catálogo de recetas. |
| | Barra de búsqueda | Campo de búsqueda por nombre de receta. |
| | Filtros | Botones para filtrar por categoría: todas, rápidas, económicas, proteicas. |
| | Catálogo de recetas | Grid dinámico de cards con imagen, título, descripción y botón para ver detalles. |
| | Vista detallada | Página de detalle con imagen, ingredientes, pasos de preparación y botón para volver. |
| | Footer | Igual al de inicio. |
| **Nosotros** (`/nosotros`) | Header | Igual al de inicio. |
| | Presentación | Historia de Nutrifit+, misión y valores del proyecto. |
| | Destacado | Resumen de la misión con lista de características principales. |
| | Enfoque | Explicación del enfoque del proyecto hacia el bienestar sostenible. |
| | Formulario de contacto | Formulario con validaciones (nombre, correo, motivo, mensaje) y redirección a página de agradecimiento. |
| | Footer | Igual al de inicio. |
| **Gracias** (`/gracias`) | Header | Igual al de inicio. |
| | Mensaje de agradecimiento | Confirmación de recepción del mensaje con botón para volver al inicio. |
| | Footer | Igual al de inicio. |

---

## Tecnologías utilizadas (React)

- **React 19.1.1** → Biblioteca de JavaScript para construir interfaces de usuario con componentes reutilizables.

- **Vite 7.1.7** → Herramienta de build y desarrollo de alta velocidad.

- **React Router DOM 7.9.4** → Enrutamiento del lado del cliente para navegación entre páginas.

- **SASS (SCSS) 1.93.2** → Preprocesador de CSS para estilos modulares y variables.

- **JavaScript (ES6+)** → Lógica y validaciones de formularios, cálculos y manejo de estados.

- **LocalStorage API** → Almacenamiento local del navegador para persistir hábitos y preferencias.

- **Fetch API + async/await** → Consumo de datos simulados (mock API) y operaciones asíncronas.

- **HTML semántico + JSX** → Estructura de componentes con etiquetas semánticas.

- **Git + GitHub** → Control de versiones, repositorio del proyecto y despliegue con GitHub Pages.

---

## Iniciar proyecto frontend (React)

### 1️⃣ Entrar a la carpeta del proyecto

```bash
cd frontend
```

### 2️⃣ Instala todas las dependencias del proyecto

```bash
npm install
```

### 3️⃣ Iniciar Vite

```bash
npm run dev
```

#### 4️⃣ Levanta el mock de backend con json-server

```bash
npx json-server --watch src/data/db.json --port 4000
```

---

## Estructura del Proyecto (React)

```
frontend/
├── public/                    # Archivos estáticos (imágenes, favicon)
│   ├── favicon.png
│   ├── logo.png
│   ├── logo-ladotexto.png
│   └── [imágenes de recetas]/
├── src/
│   ├── api/                   # Servicios API (mock)
│   │   └── recipesApi.js
│   ├── assets/                # Recursos (logo.png)
│   │   └── logo.png
│   ├── components/            # Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── Input.jsx
│   ├── data/                  # Datos estáticos
│   │   └── recipes.js
│   ├── pages/                 # Páginas/componentes de rutas
│   │   ├── About.jsx
│   │   ├── Calculators.jsx
│   │   ├── Habits.jsx
│   │   ├── Home.jsx
│   │   ├── Layout.jsx
│   │   ├── Recipes.jsx
│   │   └── Thanks.jsx
│   ├── styles/                # Estilos SASS
│   │   ├── _variables.scss
│   │   ├── global.scss
│   │   ├── About.scss
│   │   ├── Button.scss
│   │   ├── Calculators.scss
│   │   ├── Card.scss
│   │   ├── Footer.scss
│   │   ├── Habits.scss
│   │   ├── Header.scss
│   │   ├── Home.scss
│   │   ├── Input.scss
│   │   ├── Layout.scss
│   │   ├── Recipes.scss
│   │   └── Thanks.scss
│   └── main.jsx               # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Requisitos del Segundo Parcial

### Sobre React

- [X] Se debe emplear **Vite** para instalar **React**
- [X] Se debe emplear **Hooks**, useState, useEffect, useNavigate
- [X] Se debe emplear **react-router-dom** para el enrutamiento a otras páginas
- [X] Se debe emplear **outlet** para que un componente principal renderice componentes de rutas hijas.
- [X] La estructura del proyecto (carpetas) debe ser el correcto: **components**, **pages**, **styles**, **api**
- [X] La estructura del proyecto (carpetas) debe ser el correcto: components, pages, styles
- [X] Los **imports** deben ser usando con **alias**
- [X] Emplear al menos una imagen en **/public** y otra en **/assets**
- [X] Validaciones en tiempo real con onChange + mensajes de error accesibles.
- [X] Crear al menos un componente genérico (ej: Button, Card, Input) y reutilizarlo en varias páginas.
- [X] Guardar algún dato en localStorage (ej: preferencias de tema o un carrito de compras).
- [X] Emplear **mock** de al menos un servicio y permitir al menos una de estas acciones: **GET / read**, **POST / add**, **PATCH / update**, **DELETE**
- [X] Emplear **fetch** y funciones **async/await** (en lugar del `.then`)
- [X] En caso de no contar con un servicio que nos provea la información necesaria, la misma debe ser leída en formato tipo Json local y renderizar listas dinámicas.

### Sobre SASS

- [X] Todos los archivos de estilos deben encontrarse dentro de la carpeta **/styles**
- [X] El import de los estilos debe realizarse empleando **alias**
- [X] Todos los estilos deben estar aplicados en archivos con extensión **.scss**

### Sobre las Correcciones

- [X] Todas las correcciones y mejoras (sugerencias) solicitadas durante el primer parcial deben estar corregidas.
- [X] No debe haber errores presentes en el código (realizar *Code* > *Inspect Code* para verificar que no haya errores)
- [X] Se corregirá el proyecto con el último commit realizado en Github hasta las 23:59 del día anterior a la fecha de entrega
- [X] Las notas serán de la siguiente manera: (Por ejemplo 55% 4; 59% 5; 67% 6; 75% 7; 82% 8; 89% 9; 97% 10)
- Las sugerencias sobre el HTML, CSS y Js realizadas en el anterior parcial dejen ser corregidas.

| Items a Evaluar                          | %   |
|------------------------------------------|-----|
| Estructura del Proyecto                  | 10% |
| Navegación con react-router-dom          | 15% |
| Uso correcto de Hooks                    | 20% |
| Renderizado dinámico de datos            | 25% |
| Validaciones y mensajes de error         | 10% |
| Consistencia del diseño y uso de estilos | 10% |
| Código limpio y sin errores en consola   | 10% |

---

## Requisitos del FINAL

- [ ] Todas las correcciones y mejoras solicitadas durante el primer y segundo parcial deben estar corregidas.
- [ ] No debe haber errores presentes en el código (realizar Code > Inspect Code para verificar que no haya errores)
- [ ] No debe haber errores JavaScript presentes (F12 > Consola)
- [ ] Debe cumplir con TODOS los requisitos del 1er y 2do Parcial (si se agrego código nuevo en Js, se debe documentar, si hay nuevos inputs de html deben contener su label, etc)

---

## Créditos

Este proyecto fue desarrollado por **Tobías Ainete** y **Alejo Carranza** como parte del curso de **Taller de Desarrollo Web** de la **Universidad Católica de Córdoba**.


---

