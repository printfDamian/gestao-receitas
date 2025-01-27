const {
	createFavorite,
	deleteFavorite,
	getFavorite,
	getFavoriteByUserId,
} = require("../models/favoriteModel");

const getFavoritestate = async (userId, recipeId) => {
	const favorite = await getFavorite(userId, recipeId);
	return favorite ? true : false;
};

const getSetOfFavorites = async (userId, page, pageSize) => {
	const results = await getFavoriteByUserId(userId);
	return getSetOf(results, page, pageSize);
};

const getSetOfFavoritesByName = async (userId, search, page, pageSize) => {
	const results = await getFavoriteByUserId(userId);
	return getSetOf(results, page, pageSize);
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
