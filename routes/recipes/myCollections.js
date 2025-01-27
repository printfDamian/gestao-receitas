const { renderFile } = require("ejs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { getCollections, getRecipesInCollection } = require("../../controllers/collectionController");
const { verifyToken } = require("../auth/verifyToken");

const htmlTemplate = path.join(
    __dirname,
    "../..",
    "views/templates/htmlTemplate.ejs"
);

router.get("/myCollections", verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId;
        const collections = await getCollections(userId);
        
        const collectionsWithRecipes = await Promise.all(
            collections.map(async (collection) => {
                const recipes = await getRecipesInCollection(collection.id);
                return {
                    ...collection,
                    recipes
                };
            })
        );

        const content = await renderFile(
            path.join(__dirname, "../..", "views/recipes/collections.ejs"),
            { collections: collectionsWithRecipes }
        );

        return res.render(htmlTemplate, {
            docTitle: "GR - My Collections",
            upperNavBar: true,
            footer: true,
            content: content,
            token: req.userToken,
            CustomCssFiles: ["recipes/collection.css"],
            CustomJsFiles: ["recipes/collection.js", "recipes/favorite.js"],
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
