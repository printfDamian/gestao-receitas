const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
    rejectUnauthorized: false
});

const getAllMeals = async () => {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=", { httpsAgent: agent });
    return response.data.meals;
};

const getRandomMeals = async (nrMeals) => {
    const allMeals = await getAllMeals();
    const shuffled = allMeals.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, nrMeals);
};

module.exports = { getAllMeals, getRandomMeals };