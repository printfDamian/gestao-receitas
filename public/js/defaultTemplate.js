let params = new URLSearchParams(document.location.search);

$(() => {
  if (params.get("alert")) {
    let type = params.get("type") || "info";
    showAlert(params.get("alert"), type);
  }

  $(document).on("click", ".favorite", function (e) {
    e.preventDefault();
    favoriteRecipe($(this));
  });
});

function showAlert(message, type = "danger") {
  const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show fixed-top " role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", alertHTML);

  params.delete("alert");
  params.delete("type");
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, document.title, newUrl);

  setTimeout(() => {
    const alert = document.querySelector(".alert");
    if (alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }
  }, 5000);
}

$.ajaxSetup({
  beforeSend: function (xhr) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("loginToken="))
      ?.split("=")[1];
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
  },
});

/* <div class="card-body">
    <h5 class="card-title"><strong>Name: </strong>
        <%= recipe.strMeal %>
    </h5>
    <p class="card-text"><strong>Type: </strong>
        <%= recipe.strCategory %>
    </p>
    
    <div class="card-footer">
        <button class="bi bi-star favorite"></button>
        <a href="/recipeDetails?id=<%= recipe.idMeal %>"><button class="btn btn-outline-warning">Meal details</button></a>
    </div>
</div> */

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
