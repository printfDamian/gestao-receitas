const { getAllMeal, getMealById, getMealByCategory } = require('../models/mealModel');
const https = require("https");

const agent = new https.Agent({
    rejectUnauthorized: false
});

const getAllMeals = async () => {
    return await getAllMeal();
};

const getMeals = async (page, pageSize) => {
    const allMeals = await getAllMeal();
    return await getSetOf(allMeals, page, pageSize);
};

const getMealsById = async (id) => {
    return await getMealById(id);
};

const getMealsByCategory = async (category) => {
    return await getMealByCategory(category);
};

const getRandomMeals = async (nrMeals) => {
    const allMeals = await getAllMeal();
    const shuffled = allMeals.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, nrMeals);
};

const getSetOf = async (results, page, pageSize) => {
    const maxPageSize = 30;
    
    if(pageSize > results.length || pageSize > maxPageSize) {
        pageSize = maxPageSize;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return results.slice(startIndex, endIndex);
};

module.exports = { getAllMeals, getRandomMeals, getMealsById, getMealsByCategory };