const { getRandomMeal } = require("../models/mealModel");

const getRandomMeals = async (nrMeals, retries) => {
    const meals = [];
    
    while(meals.length < nrMeals && retries > 0) {
        let meal = await getRandomMeal();
        if(!meals.includes(meal)) {
            meals.push(meal);
        } else {
            retries--;
        }
    }

    return meals;
}

module.exports = { getRandomMeals };
