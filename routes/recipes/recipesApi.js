const express = require("express");
const router = express.Router();
const recipeController = require("../../controllers/recipeController");


router.get("/recipes",async (req, res) => {
    res.send(await recipeController.getAllRecipes())
});

router.get("/recipes/:id", async (req, res) => {
    res.send(await recipeController.getRecipeById(req.params.id))
});



module.exports = router;
