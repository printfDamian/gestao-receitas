$(function() {
    $('.ingredient-item').on('click', function() {
        const ingredient = $(this).data('ingredient');
        const modal = $('#ingredientModal');
        
        // Update modal content
        modal.find('#ingredientModalImg').attr('src', 
            `https://www.themealdb.com/images/ingredients/${ingredient}.png`);
        modal.find('#ingredientModalTitle').text(ingredient);
    });
});