const BASE_URL = "http://localhost:4000";

/**
 * Realiza una petición fetch genérica al mock server
 * @param {string} endpoint - Endpoint del recurso
 * @param {Object} options - Opciones de fetch (method, body, etc.)
 * @param {string} errorMessage - Mensaje de error personalizado
 */
const fetchData = async (endpoint, options = {}, errorMessage) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(errorMessage || 'Error en la petición');
    return await res.json();
  } catch (err) {
    console.error(`${errorMessage}:`, err);
    return null;
  }
};

/**
 * Obtiene todas las recetas
 * @returns {Promise<Array>}
 */
export const getRecipes = async () => {
  return await fetchData('/recipes', {}, 'Error al obtener las recetas');
};

/**
 * Obtiene una receta por ID
 * @param {string|number} id - ID de la receta
 * @returns {Promise<Object|null>}
 */
export const getRecipeById = async (id) => {
  return await fetchData(`/recipes/${id}`, {}, 'Error al obtener la receta');
};

/**
 * Crea una nueva receta
 * @param {Object} recipe - Datos de la receta
 * @returns {Promise<Object|null>}
 */
export const createRecipe = async (recipe) => {
  return await fetchData('/recipes', {
    method: 'POST',
    body: JSON.stringify(recipe),
  }, 'Error al crear la receta');
};

/**
 * Actualiza una receta existente
 * @param {string|number} id - ID de la receta
 * @param {Object} recipe - Datos actualizados de la receta
 * @returns {Promise<Object|null>}
 */
export const updateRecipe = async (id, recipe) => {
  return await fetchData(`/recipes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(recipe),
  }, 'Error al actualizar la receta');
};

/**
 * Elimina una receta
 * @param {string|number} id - ID de la receta
 * @returns {Promise<boolean>}
 */
export const deleteRecipe = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar la receta');
    return true;
  } catch (err) {
    console.error('Error al eliminar la receta:', err);
    return false;
  }
};

