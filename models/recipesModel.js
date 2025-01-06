const axios = require("axios");

const recipesModel = (pool) => {
    const getAllRecipes = async () => {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=", { httpsAgent: agent });
        return response.data.meals;
    }

    const getRecipeById = async (id) => {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id, { httpsAgent: agent });
        return response.data.meals;
    }

    const getRecipeByCategory = async (category) => {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category, { httpsAgent: agent });
        return response.data.meals;
    }

    return { getAllRecipes, getRecipeById, getRecipeByCategory };
}

export default userModel;
