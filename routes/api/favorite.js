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

    let favorites = [];
    if (search) {
      favorites = await getSetOfFavoritesByName(userId, search, page, 20);
    } else {
      favorites = await getSetOfFavorites(userId, page, 20);
    }

    const recipePromises = favorites.map((favorite) =>
      getMealById(favorite.recipe_id)
    );
    const recipes = await Promise.all(recipePromises);

    if (req.userToken) {
      const favoritePromises = recipes.map((recipe) =>
        getFavoritestate(req.userToken, recipe.idMeal)
      );
      const favoriteStates = await Promise.all(favoritePromises);

      recipes.forEach((recipe, index) => {
        recipe.isFavorite = favoriteStates[index];
      });
    } else {
      recipes.forEach((recipe) => {
        recipe.isFavorite = false;
      });
    }

    return res.json(recipes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
