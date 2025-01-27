const pool = require("../configs/localDataBase");

const createFavorite = async (userId, recipeId) => {
  try {
    const [rows] = await pool.query(
      "INSERT INTO favorite_recipes (user_id, recipe_id) VALUES (?, ?)",
      [userId, recipeId]
    );
    return rows || null;
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
};

const getFavoriteByRecipeId = async (recipeId) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, user_id, recipe_id, CREATED_AT, UPDATED_AT FROM favorite_recipes WHERE recipe_id = ?",
      [recipeId]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Error getting favorite:", error);
    throw error;
  }
};

const getFavoriteByUserId = async (userId) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, user_id, recipe_id, CREATED_AT, UPDATED_AT FROM favorite_recipes WHERE user_id = ?",
      [userId]
    );
    return rows || null;
  } catch (error) {
    console.error("Error getting favorite:", error);
    throw error;
  }
};

const getFavorite = async (userId, recipeId) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, user_id, recipe_id, CREATED_AT, UPDATED_AT FROM favorite_recipes WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Error getting favorite:", error);
    throw error;
  }
};

const deleteFavorite = async (id) => {
  try {
    const [rows] = await pool.query(
      "DELETE FROM favorite_recipes WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
};

const getFavoriteRecipes = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT fr.*, u.name as user_name 
       FROM favorite_recipes fr 
       JOIN users u ON fr.user_id = u.id 
       ORDER BY fr.CREATED_AT DESC`
    );
    return rows || [];
  } catch (error) {
    console.error("Error getting favorite recipes:", error);
    throw error;
  }
};

module.exports = {
  createFavorite,
  getFavoriteByRecipeId,
  getFavoriteByUserId,
  getFavorite,
  deleteFavorite,
  getFavoriteRecipes
};
