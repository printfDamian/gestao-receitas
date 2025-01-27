const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getSetOfFavorites,
  getFavoritestate,
} = require("../../controllers/favoriteController");
const { getMealById } = require("../../controllers/mealController");
const { verifyToken } = require("../auth/verifyToken");

const htmlTemplate = path.join(
  __dirname,
  "../..",
  "views/templates/htmlTemplate.ejs"
);

router.get("/favorites", verifyToken, async (req, res, next) => {
  try {
    const userId = req.userId;
    const favouritsList = await getSetOfFavorites(userId, 1, 20);

    const recipePromises = favouritsList.map((favorite) =>
      getMealById(favorite.recipe_id)
    );
    const recipes = await Promise.all(recipePromises);

    if (req.userToken) {
      const favoritePromises = recipes.map((recipe) =>
        getFavoritestate(req.userToken, recipe.idMeal)
      );
      const favorites = await Promise.all(favoritePromises);

      recipes.forEach((recipe, index) => {
        recipe.isFavorite = favorites[index];
      });
    }

    const content = await renderFile(
      path.join(__dirname, "../..", "views/recipes/explorer.ejs"),
      { recipes }
    );

    return res.render(htmlTemplate, {
      docTitle: "GR - Favorites",
      upperNavBar: true,
      footer: true,
      content: content,
      token: req.userToken,
      CustomCssFiles: ["recipes/explorer.css"],
      CustomJsFiles: ["recipes/favorites.js", "recipes/search.js"],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
