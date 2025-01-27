$(document).on("click", ".favorite", function (e) {
    e.preventDefault();
    favoriteRecipe($(this));
});

async function favoriteRecipe($element) {
    const recipeLink = $element.closest(".card-footer").find("a");
    if (!recipeLink.length) {
        console.error("Recipe link not found");
        return;
    }

    const recipeId = recipeLink.attr("href")?.split("=")[1];
    const recipeName = $element
        .closest(".card")
        .find(".card-title")
        .text()
        .trim();
    let favoritestate = $element.hasClass("bi-star-fill");
    let serverFavoritestate;

    if (!document.cookie.includes("loginToken")) {
        showAlert("Please login to favorite recipes", "danger");
        return;
    }

    await $.ajax({
        url: "/api/favorite/" + recipeId,
        method: "GET",
        success: function (data) {
            serverFavoritestate = data.isFavorite;
        },
        error: function (error) {
            return showAlert(error.message, "danger");
        },
    });

    if (favoritestate === serverFavoritestate) {
        if (serverFavoritestate) {
            $.ajax({
                url: "/api/favorite/" + recipeId,
                method: "DELETE",
                success: function (data) {
                    $element.removeClass("bi-star-fill text-warning");
                    $element.addClass("bi-star");
                    showAlert(`${recipeName} removed from favorites`, "warning");
                },
                error: function (error) {
                    return showAlert(error.message, "danger");
                },
            });
        } else {
            $.ajax({
                url: "/api/favorite/" + recipeId,
                method: "POST",
                success: function (data) {
                    $element.removeClass("bi-star");
                    $element.addClass("bi-star-fill text-warning");
                    showAlert(`${recipeName} added to favorites`, "warning");
                },
                error: function (error) {
                    return showAlert(error.message, "danger");
                },
            });
        }
    } else {
        if (serverFavoritestate) {
            $element.removeClass("bi-star");
            $element.addClass("bi-star-fill text-warning");
        } else {
            $element.removeClass("bi-star-fill text-warning");
            $element.addClass("bi-star");
        }
    }
}