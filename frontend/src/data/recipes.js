import db from './db.json';
// Convertimos el array de recetas en un objeto indexado por id para mantener el contrato original
export const defaultRecipes = db.recipes.reduce((acc, recipe) => {
  acc[recipe.id] = recipe;
  return acc;
}, {});

export const recipesArray = db.recipes;
