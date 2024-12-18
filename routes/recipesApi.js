const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");


router.get("/recipes",async (req, res) => {
    res.send(await recipesController.getAllRecipes())
});

router.get("/recipes/:id", async (req, res) => {
    res.send(await recipesController.getRecipeById(req.params.id))
});

module.exports = router;
