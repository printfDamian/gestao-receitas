const {
    createCollection,
    addRecipeToCollection,
    getUserCollections,
    getCollectionRecipes,
    removeRecipeFromCollection
} = require('../models/collectionModel');

const { getFavoriteByRecipeId } = require('../models/favoriteModel');
const { getMealById } = require('../models/mealModel');

const createNewCollection = async (userId, name) => {
    return await createCollection(userId, name);
};

const addToCollection = async (collectionId, recipeId) => {
    await addRecipeToCollection(collectionId, recipeId);
};

const getCollections = async (userId) => {
    return await getUserCollections(userId);
};

const getRecipesInCollection = async (collectionId) => {
    const recipeIds = await getCollectionRecipes(collectionId);
    const recipes = await Promise.all(
        recipeIds.map(async recipe => {
            const mealData = await getMealById(recipe.recipe_id);
            // Add favorite state
            const favoriteState = await getFavoriteByRecipeId(recipe.recipe_id);
            return {
                ...mealData,
                isFavorite: !!favoriteState
            };
        })
    );
    return recipes;
};

const getCollectionState = async (userId, recipeId) => {
    const collections = await getUserCollections(userId);
    const collectionRecipes = await Promise.all(
        collections.map(collection => getCollectionRecipes(collection.id))
    );
    return collectionRecipes.flat().some(recipe => recipe.recipe_id === recipeId);
};

const removeFromCollection = async (collectionId, recipeId) => {
    return await removeRecipeFromCollection(collectionId, recipeId);
};

const getSetOfCollections = async (userId, page, pageSize) => {
    const collections = await getUserCollections(userId);
    return getSetOf(collections, page, pageSize);
};

module.exports = {
    createNewCollection,
    addToCollection,
    getCollections,
    getRecipesInCollection,
    getCollectionState,
    removeFromCollection,
    getSetOfCollections
};