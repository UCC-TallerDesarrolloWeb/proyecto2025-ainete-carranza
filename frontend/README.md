# Nutrifit+ - Migración a React + Vite

## 📋 Descripción

Este proyecto es la migración de una aplicación web desarrollada en HTML, CSS y JavaScript vanilla a React + Vite, manteniendo el diseño visual, las funcionalidades y la estética originales.

## 🚀 Tecnologías Empleadas

- **React 19.1.1** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 7.1.7** - Herramienta de build y desarrollo
- **React Router DOM 7.9.4** - Enrutamiento del lado del cliente
- **SASS 1.93.2** - Preprocesador de CSS
- **Hooks de React** - useState, useEffect, useNavigate
- **LocalStorage** - Almacenamiento local del navegador
- **Fetch API** - Para operaciones con API mock

## 📦 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos para ejecutar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne)

4. **Build para producción:**
   ```bash
   npm run build
   ```

5. **Preview del build:**
   ```bash
   npm run preview
   ```

## 🏗️ Estructura del Proyecto

```
frontend/
├── public/              # Archivos estáticos (imágenes, favicon)
├── src/
│   ├── api/            # Servicios API (mock)
│   ├── assets/         # Recursos (imágenes en assets)
│   ├── components/     # Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── Input.jsx
│   ├── data/           # Datos estáticos
│   ├── pages/          # Páginas/componentes de rutas
│   │   ├── About.jsx
│   │   ├── Calculators.jsx
│   │   ├── Habits.jsx
│   │   ├── Home.jsx
│   │   ├── Layout.jsx
│   │   ├── Recipes.jsx
│   │   └── Thanks.jsx
│   ├── styles/         # Estilos SASS
│   │   ├── _variables.scss
│   │   ├── global.scss
│   │   └── [component].scss
│   ├── utils/          # Utilidades
│   └── main.jsx        # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ✨ Características Implementadas

### Parte 1 - React y Estructura
- ✅ Proyecto basado en React + Vite
- ✅ Uso de Hooks: useState, useEffect, useNavigate
- ✅ Enrutamiento con react-router-dom
- ✅ Implementación de `<Outlet />` para rutas hijas
- ✅ Estructura coherente y organizada
- ✅ Imports mediante alias (@/components, @/styles, etc.)

### Parte 2 - Validaciones, Componentes y Almacenamiento
- ✅ Imágenes en /public y /src/assets
- ✅ Formularios con validaciones en tiempo real (onChange)
- ✅ Mensajes de error accesibles (aria-live, aria-describedby)
- ✅ Componentes reutilizables:
  - Button (variantes: primary, outline, filter)
  - Card
  - Input (con validación integrada)
- ✅ LocalStorage funcional:
  - Hábitos guardados localmente
  - Fecha de última actualización
  - Tema oscuro (preparado)

### Parte 3 - API Mock
- ✅ Servicio mock en `src/api/recipesApi.js`
- ✅ Operaciones CRUD:
  - GET /recipes (READ)
  - GET /recipes/:id (READ)
  - POST /recipes (CREATE)
  - PATCH /recipes/:id (UPDATE)
  - DELETE /recipes/:id (DELETE)
- ✅ Uso de fetch + async/await (sin .then())
- ✅ Fallback con datos estáticos en `src/data/recipes.js`

### Validaciones Específicas
- ✅ **Nombre**: Solo letras (con tildes y ñ), regex: `^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$`
- ✅ **Edad**: Entero positivo (0-120), sin coma ni punto
- ✅ **Peso**: Máximo 3 dígitos (0-999), sin coma
- ✅ **Altura**: Menor a 3 (en metros)
- ✅ En caso de error: limpiar input, mostrar mensaje accesible y enfocar el campo

### SASS y Estilos
- ✅ Todos los estilos en `src/styles/` con extensión `.scss`
- ✅ Imports mediante alias (@/styles/...)
- ✅ Variables SASS en `_variables.scss`
- ✅ Sin duplicados o CSS externos
- ✅ Estilos organizados por componente

## 🎯 Funcionalidades Principales

### Calculadoras
- Calculadora de IMC (Índice de Masa Corporal)
- Calculadora de hidratación sugerida
- Calculadora de calorías estimadas (fórmula Mifflin-St Jeor)

### Hábitos
- Lista de hábitos personalizable
- Guardado local con LocalStorage
- Agregar/eliminar hábitos
- Tracking de progreso diario

### Recetas
- Catálogo de recetas saludables
- Filtros por categoría (rápidas, económicas, proteicas)
- Búsqueda por nombre
- Vista detallada de cada receta

### Contacto
- Formulario de contacto con validaciones
- Redirección a página de agradecimiento
- Validación de campos en tiempo real

## 📝 Notas de Desarrollo

- El proyecto sigue las convenciones y estructura del proyecto de referencia (proyecto2025-yelicich)
- Todos los componentes están escritos como componentes funcionales
- Se utiliza React Router DOM para la navegación
- Los estilos están organizados siguiendo la metodología BEM donde corresponde
- El código está documentado con JSDoc en funciones complejas

## 📘 Pasos de ejecución del proyecto (2026)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/<usuario>/<nombre-del-repo>.git
   cd <nombre-del-repo>/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el entorno de desarrollo**
   ```bash
   npm run dev
   ```

4. **Acceder al proyecto en el navegador**
   - Abrir `http://localhost:5173/` (o el puerto que Vite asigne automáticamente)

5. **(Opcional) Compilar para producción**
   ```bash
   npm run build
   ```

6. **(Opcional) Preview del build de producción**
   ```bash
   npm run preview
   ```

---

## 🧰 Tecnologías utilizadas (2026)

- **Vite + React** → Framework base del proyecto.
- **React Router DOM** → Enrutamiento entre páginas.
- **SASS (SCSS)** → Sistema de estilos modular.
- **JavaScript (ES2026)** → Lógica y validaciones.
- **LocalStorage API** → Persistencia local de datos.
- **Fetch + async/await** → Consumo de datos simulados (mock API).
- **HTML semántico + JSX** → Estructura de componentes.
- **Git + GitHub** → Control de versiones y despliegue.

---

## 📖 Descripción del trabajo realizado (Segundo Parcial)

Durante esta segunda etapa del proyecto, se migró la estructura original desarrollada en **HTML, CSS y JavaScript puro** hacia un entorno moderno con **React + Vite**.  

El objetivo fue aplicar buenas prácticas de modularización, reutilización de componentes y validaciones en tiempo real.  

Se mantuvo la estética y la lógica del proyecto original, adaptándola al paradigma de componentes de React.  

Además, se incorporaron validaciones de formularios, manejo de estados con Hooks, almacenamiento local con LocalStorage y rutas dinámicas mediante React Router DOM.  

El resultado es un proyecto más escalable, organizado y acorde a los estándares de desarrollo web actuales.

---

## 📦 Estructura del proyecto

```
frontend/
├── public/                    # Archivos estáticos (imágenes, favicon)
│   ├── favicon.png
│   ├── logo.png
│   ├── logo-ladotexto.png
│   └── [imágenes de recetas]/
├── src/
│   ├── api/                   # Servicios API (mock) - vacío actualmente
│   ├── assets/                # Recursos (logo.png)
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

## 📅 Año

2026

## 👥 Autor

Migración realizada basándose en el proyecto original de ainete & carranza y siguiendo los estándares del proyecto de referencia de Yelicich.

## 📄 Licencia

Este proyecto es parte de un trabajo académico.

---

✅ Actualizado automáticamente para cumplir con los requisitos del Segundo Parcial (2026)
