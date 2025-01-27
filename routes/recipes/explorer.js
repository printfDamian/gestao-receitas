const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getSetOfMeals } = require("../../controllers/mealController");
const { getFavoritestate } = require("../../controllers/favoriteController");

const htmlTemplate = path.join(
  __dirname,
  "../..",
  "views/templates/htmlTemplate.ejs"
);

// Explore recipes page route
router.get("/explorer", async (req, res, next) => {
  try {
    const recipes = await getSetOfMeals(1, 20);

    if (req.userToken) {
      const userId = req.userToken;
      const favoritePromises = recipes.map((recipe) =>
        getFavoritestate(userId, recipe.idMeal)
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
console.log("asasdsadasdadsaadsasd: ", req.userRole);
    return res.render(htmlTemplate, {
      docTitle: "GR - Explorer",
      upperNavBar: true,
      footer: true,
      content: content,
      token: req.userToken,
      role: req.userRole,
      CustomCssFiles: ["recipes/explorer.css"],
      CustomJsFiles: ["recipes/explorer.js", "recipes/search.js"],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
