const {
	createFavorite,
	deleteFavorite,
	getFavorite,
	getFavoriteByUserId,
} = require("../models/favoriteModel");

const { getMealById } = require("../models/mealModel");

const getFavoritestate = async (userId, recipeId) => {
	const favorite = await getFavorite(userId, recipeId);
	return favorite ? true : false;
};

const getSetOfFavorites = async (userId, page, pageSize) => {
	const results = await getFavoriteByUserId(userId);
	return getSetOf(results, page, pageSize);
};

const getSetOfFavoritesByName = async (userId, search, page, pageSize) => {
    try {
        const favorites = await getFavoriteByUserId(userId);
        
        const recipePromises = favorites.map(favorite => getMealById(favorite.recipe_id));
        const recipes = await Promise.all(recipePromises);
        
        const filteredRecipes = recipes.filter(recipe => 
            recipe.strMeal.toLowerCase().includes(search.toLowerCase())
        );
        
        return getSetOf(filteredRecipes, page, pageSize);
    } catch (error) {
        console.error("Error in getSetOfFavoritesByName:", error);
        throw error;
    }
};

function getSetOf(results, page, pageSize) {
	const maxPageSize = 30;

	if (pageSize > results.length || pageSize > maxPageSize) {
		pageSize = maxPageSize;
	}

	const startIndex = (page - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	return results.slice(startIndex, endIndex);
}

module.exports = {
	createFavorite,
	deleteFavorite,
	getFavoritestate,
	getFavorite,
	getFavoriteByUserId,
	getSetOfFavorites,
	getSetOfFavoritesByName,
};
