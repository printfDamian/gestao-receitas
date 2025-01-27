const express = require("express");
const router = express.Router();
const {
  getSetOfMeals,
  getMealByName,
  getSetOfMealsByName,
} = require("../../controllers/mealController");
const { getFavoritestate } = require("../../controllers/favoriteController");

router.get("/api/recipes", async (req, res, next) => {
  try {
    const search = req.query.search;
    const page = req.query.page || 1;

    let recipes = [];
    if (search) {
      recipes = await getSetOfMealsByName(search, page, 20);
    } else {
      recipes = await getSetOfMeals(page, 20);
    }

    if (req.userToken) {
      const userId = req.userToken;
      const favoritePromises = recipes.map((recipe) =>
        getFavoritestate(userId, recipe.idMeal)
      );
      const favorites = await Promise.all(favoritePromises);

      recipes.forEach((recipe, index) => {
        recipe.isFavorite = favorites[index];
      });

      return res.json(recipes);
    } else {
      recipes.forEach((recipe) => {
        recipe.isFavorite = false;
      });
      return res.json(recipes);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/api/recipes/tips", async (req, res, next) => {
  try {
    const search = req.query.search;
    if (!search) {
      return res.json([]);
    }

    const meals = await getMealByName(search);
    if (!meals) {
      return res.json([]);
    }

    const tips = meals.map((meal) => ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
    }));

    return res.json(tips);
  } catch (error) {
    console.error("Tips API Error:", error);
    next(error);
  }
});

module.exports = router;
