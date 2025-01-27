const fs = require('fs');
const fetch = require('node-fetch');

const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
const locF = "db/datasetIngredientPriced.json";

function givePrice(json) {
    for (let ingredient of json.meals) {
        ingredient.price = (Math.random() * 7 + 1).toFixed(2) + "€";
    }

    return json;
} 

async function ProcessFile() {
    let data;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        data = await response.json();
    } catch (err) {
        console.error(err);
        return;
    }

    let jsonPriced = givePrice(data);

    try {
        fs.writeFileSync(locF, JSON.stringify(jsonPriced, null, 2), "utf8");
    } catch (err) {
        console.error(err);
    }
}

ProcessFile();