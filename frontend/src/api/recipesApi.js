const BASE_URL = "http://localhost:4000";

/*
  Función simple para pedir datos al servidor
  Devuelve el JSON si sale bien o null si hay error
*/
const request = async (endpoint) => {  /*endpoint es la ruta del final de la url*/
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);/* fetch es una funcion que permite hacer peticiones a una url*/

    if (!response.ok) {
      return null;
    }

    return await response.json();/* response.json() es una funcion que permite convertir la respuesta en array de js*/
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    return null;
  }
};

/*
  Obtiene todas las recetas
*/
export const getRecipes = async () => {
  return await request("/recipes");
};

/*
  Obtiene una receta por su ID
*/
export const getRecipeById = async (id) => {
  return await request(`/recipes/${id}`);
};