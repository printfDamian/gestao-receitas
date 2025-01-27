const { 
    getAllMeals, 
    getMealById, 
    getMealsByCategory, 
    getCategories, 
    getMealByName 
} = require('../models/mealModel');

let recipesCache = null;

async function byPassGetAllRecipiesLimit() {
    if (recipesCache) {
        console.log('Returning cached recipes');
        return recipesCache;
    }

    const allRecipes = new Map();

    try {
        const categories = await getCategories();

        for (const category of categories) {
            const meals = await getMealsByCategory(category.strCategory);
            if (meals) {
                console.log(`Fetched ${meals.length}`);
                meals.forEach(meal => allRecipes.set(meal.idMeal, meal));
            }
        } // 303 Recipes 

        const allRecipesArray = Array.from(allRecipes.values());
        console.log(`Fetched ${allRecipesArray.length} unique recipes.`);
        recipesCache = allRecipesArray;
        return allRecipesArray;

    } catch (error) {
        console.error('Error fetching all recipes with ByPass:', error);
        return getAllMeals();
    }
}

const getSetOfMeals = async (page, pageSize) => {
    const allMeals = await byPassGetAllRecipiesLimit();
    return await getSetOf(allMeals, page, pageSize);
};

const getSetOfMealsByName = async (name, page, pageSize) => {
    const allMeals = await getMealByName(name);
    return await getSetOf(allMeals, page, pageSize);
}

const getRandomMeals = async (nrMeals) => {
    const allMeals = await byPassGetAllRecipiesLimit();
    const shuffled = allMeals.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, nrMeals);
};

function getSetOf (results, page, pageSize) {
    const maxPageSize = 30;
    
    if(pageSize > results.length || pageSize > maxPageSize) {
        pageSize = maxPageSize;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return results.slice(startIndex, endIndex);
};

module.exports = { getAllMeals, getRandomMeals, getMealById, getMealsByCategory, getSetOfMeals, getMealByName, getSetOfMealsByName, getCategories };
