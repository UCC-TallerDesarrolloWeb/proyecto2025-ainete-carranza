import db from './db.json';

/**
 * Datos de recetas por defecto (fallback si no hay API)
 * Derivados de db.json para evitar duplicación.
 */

// Convertimos el array de recetas en un objeto indexado por id para mantener el contrato original
export const defaultRecipes = db.recipes.reduce((acc, recipe) => {
  acc[recipe.id] = recipe;
  return acc;
}, {});

export const recipesArray = db.recipes;
