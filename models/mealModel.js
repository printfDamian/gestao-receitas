const fetch = require('node-fetch');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

const apiURL = "https://www.themealdb.com/api/json/v1/1/";

const getMealByName = async (name) => {
    console.log("getMealByName: ", name);
    const response = await fetch(apiURL + "search.php?s=" + name, { agent });
    const data = await response.json();
    return data.meals;
}

const getMealById = async (id) => {
    console.log("getMealById: ", id);
    const response = await fetch(apiURL + "lookup.php?i=" + id, { agent });
    const data = await response.json();
    return data.meals[0];
}

const getRandomMeal = async () => {
    console.log("getRandomMeal");
    const response = await fetch(apiURL + "random.php", { agent });
    const data = await response.json();
    return data.meals;
}

// limited to 25 meals
const getAllMeals = async () => {
    console.log("getAllMeals");
    const response = await fetch(apiURL + "search.php?s=", { agent });
    const data = await response.json();
    return data.meals;
}

const getMealsByCategory = async (category) => {
    console.log("getMealsByCategory: ", category);
    const response = await fetch(apiURL + "filter.php?c=" + category, { agent });
    const data = await response.json();
    return data.meals;
}

const getMealsByArea = async (area) => {
    console.log("getMealsByArea: ", area);
    const response = await fetch(apiURL + "filter.php?a=" + area, { agent });
    const data = await response.json();
    return data.meals;
}

const getMealsByIngredient = async (ingredient) => {
    console.log("getMealsByIngredient: ", ingredient);
    const response = await fetch(apiURL + "filter.php?i=" + ingredient, { agent });
    const data = await response.json();
    return data.meals;
}

const getMealsByLetter = async (letter) => {
    console.log("getMealsByLetter: ", letter);
    const response = await fetch(apiURL + "search.php?f=" + letter, { agent });
    const data = await response.json();
    return data.meals;
}

const getCategories = async () => {
    console.log("getCategories");
    const response = await fetch(apiURL + "categories.php", { agent });
    const data = await response.json();
    return data.categories;
}

const getAreas = async () => {
    console.log("getAreas");
    const response = await fetch(apiURL + "list.php?a=list", { agent });
    const data = await response.json();
    return data.meals;
}

const getIngredients = async () => {
    console.log("getIngredients");
    const response = await fetch(apiURL + "list.php?i=list", { agent });
    const data = await response.json();
    return data.meals;
}

module.exports = { getMealByName, getMealById, getRandomMeal, getAllMeals, getMealsByCategory, getMealsByArea, getMealsByIngredient, getMealsByLetter, getCategories, getAreas, getIngredients };
