const express = require("express");
const router = express.Router();
const {
	createFavorite,
	deleteFavorite,
	getFavoritestate,
	getFavorite,
	getFavoriteByUserId,
	getSetOfFavorites,
	getSetOfFavoritesByName,
} = require("../../controllers/favoriteController");
const { verifyToken } = require("../auth/verifyToken");

router.get("/api/favorite/:id", verifyToken, async (req, res, next) => {
	try {
		const recipeId = req.params.id;
		const userId = req.userId;
		return res.json({ isFavorite: await getFavoritestate(userId, recipeId) });
	} catch (error) {
		next(error);
	}
});

router.post("/api/favorite/:id", verifyToken, async (req, res, next) => {
	try {
		const recipeId = req.params.id;
		const userId = req.userId;
		if (await getFavoritestate(userId, recipeId)) {
			return res.status(400).json({ message: "Recipe already favorited" });
		}
		return res.send(await createFavorite(userId, recipeId));
	} catch (error) {
		next(error);
	}
});

router.delete("/api/favorite/:id", verifyToken, async (req, res, next) => {
	try {
		const recipeId = req.params.id;
		const userId = req.userId;
		let favorite = await getFavorite(userId, recipeId);
		return res.send(await deleteFavorite(favorite.id));
	} catch (error) {
		next(error);
	}
});

router.get("/api/favorites", verifyToken, async (req, res, next) => {
	try {
		const search = req.query.search;
		const page = req.query.page || 1;
		const userId = req.userId;

		let recipes = [];
		if (search) {
			recipes = await getSetOfFavoritesByName(userId, search, page, 20);
		} else {
			const favorites = await getSetOfFavorites(userId, page, 20);
			const recipePromises = favorites.map((favorite) =>
				getMealById(favorite.recipe_id)
			);
			recipes = await Promise.all(recipePromises);
		}

		const favoritePromises = recipes.map((recipe) =>
			getFavoritestate(userId, recipe.idMeal)
		);
		const favoriteStates = await Promise.all(favoritePromises);

		recipes.forEach((recipe, index) => {
			recipe.isFavorite = favoriteStates[index];
		});

		return res.json(recipes);
	} catch (error) {
		console.error("Favorites API Error:", error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
