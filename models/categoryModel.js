const axios = require("axios");

const categoryModel = (pool) => {
    const getCategory = async () => {
        const response = await axios.get("www.themealdb.com/api/json/v1/1/list.php?c=list", { httpsAgent: agent });
        return response.data.categorys;
    }
    return { getCategory };
}

export default categoryModel;
