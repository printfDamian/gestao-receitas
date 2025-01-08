const axios = require("axios");
const https = require('https');

// Create HTTPS agent with proper SSL/TLS config
const agent = new https.Agent({
    rejectUnauthorized: false // Note: Only use in development/testing
});

const getAllMeal = async () => {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=", { httpsAgent: agent });
    return response.data.meals;
}

const getMealById = async (id) => {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id, { httpsAgent: agent });
    return response.data.meals;
}

const getMealByCategory = async (category) => {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category, { httpsAgent: agent });
    return response.data.meals;
}

const getRandomMeal = async () => {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php", { httpsAgent: agent });
    return response.data.meals;
}

module.exports = { getAllMeal, getMealById, getMealByCategory, getRandomMeal };
