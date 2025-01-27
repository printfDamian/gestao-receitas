const pool = require("../configs/localDataBase");

const createCollection = async (userId, name) => {
    const [result] = await pool.query(
        "INSERT INTO collections (user_id, name) VALUES (?, ?)",
        [userId, name]
    );
    return result.insertId;
};

const addRecipeToCollection = async (collectionId, recipeId) => {
    await pool.query(
        "INSERT INTO collection_recipes (collection_id, recipe_id) VALUES (?, ?)",
        [collectionId, recipeId]
    );
};

const getUserCollections = async (userId) => {
    const [collections] = await pool.query(
        "SELECT * FROM collections WHERE user_id = ?",
        [userId]
    );
    return collections;
};

const getCollectionRecipes = async (collectionId) => {
    const [recipes] = await pool.query(
        "SELECT recipe_id FROM collection_recipes WHERE collection_id = ?",
        [collectionId]
    );
    return recipes;
};

const removeRecipeFromCollection = async (collectionId, recipeId) => {
    await pool.query(
        "DELETE FROM collection_recipes WHERE collection_id = ? AND recipe_id = ?",
        [collectionId, recipeId]
    );
};

const removeCollection = async (collectionId) => {
    await pool.query(
        "DELETE FROM collection_recipes WHERE collection_id = ?",
        [collectionId]
    );
    await pool.query(
        "DELETE FROM collections WHERE id = ?",
        [collectionId]
    );
};

const updateCollection = async (collectionId, name) => {
    await pool.query(
        "UPDATE collections SET name = ? WHERE id = ?",
        [name, collectionId]
    );
};

module.exports = {
    createCollection,
    addRecipeToCollection,
    getUserCollections,
    getCollectionRecipes,
    removeRecipeFromCollection,
    removeCollection,
    updateCollection
};