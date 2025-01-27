const ingredientPrices = require('../db/datasetIngredientPriced.json');

function calculateTime(instructions) {
    const timeRegex = /(\d+)\s*(hour|minute|second)s?/gi;
    let totalMinutes = 0;
    
    let match;
    while ((match = timeRegex.exec(instructions)) !== null) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        
        switch(unit) {
            case 'hour':
                totalMinutes += value * 60;
                break;
            case 'minute':
                totalMinutes += value;
                break;
            case 'second':
                totalMinutes += value / 60;
                break;
        }
    }
    
    return Math.round(totalMinutes);
}

function calculateDifficulty(instructions, ingredients) {
    const instructionsLength = instructions.length;
    const ingredientCount = ingredients.length;
    
    const score = (instructionsLength / 100) + (ingredientCount * 2);

    if (score < 30) return 'Easy';
    if (score < 50) return 'Medium';
    return 'Hard';
}

function calculateCost(recipe) {
    let totalCost = 0;
    
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        
        if (ingredient && ingredient.trim()) {
            const ingredientData = ingredientPrices.meals.find(
                item => item.strIngredient.toLowerCase() === ingredient.toLowerCase()
            );
            
            if (ingredientData) {
                const price = parseFloat(ingredientData.price);
                totalCost += price;
            }
        }
    }
    
    return totalCost.toFixed(2);
}

module.exports = {
    calculateTime,
    calculateDifficulty,
    calculateCost
};