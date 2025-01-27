let page = 2;
let typingTimer;
let tipCache = [];
let inputValueCache = "";
const doneTypingInterval = 500;

$(function () {
	const cardContainer = $(".cardContainer");

	const noMoreRecipes = $("#no-more-recipes");
	const noResults = $("#no-results");

	const searchInput = $(".search_input");
	const searchIcon = $(".search_icon");
	const tipsContainer = $(".tips-container");

	noMoreRecipes.hide();
	noResults.hide();
	tipsContainer.hide();

	$("#show-more").on("click", function () {
		showAlert("Loading more recipes...", "info");

		let searchQuery = "";
		inputValueCache = searchInput.val();
		if (inputValueCache.length > 0) {
			searchQuery = `&search=${inputValueCache}`;
		}

		$.ajax({
			url: `${url}?page=${page}${searchQuery}`,
			method: "GET",
			success: (data) => {
				if (data.length === 0) {
					$("#show-more").hide();
					noMoreRecipes.show();
					return;
				}

				data.forEach((recipe) => {
					cardContainer.append(createCard(recipe));
				});

				page++;
			},
			error: (error) => {
				console.error("Ajax error:", error);
				showAlert("Error loading more recipes", "danger");
			},
		});
	});

	searchInput
		.on("focus", function () {
			const searchValue = $(this).val();
			if (searchValue) {
				showTips(searchValue);
			}
		})
		.on("blur", function () {
			blurTimer = setTimeout(() => {
				tipsContainer.hide();
			}, 200);
		})
		.on("input", function () {
			clearTimeout(typingTimer);
			const searchValue = $(this).val();

			if (searchValue) {
				typingTimer = setTimeout(
					() => showTips(searchValue),
					doneTypingInterval
				);
			} else {
				tipsContainer.hide();
			}
		})
		.on("keypress", function (e) {
			if (e.key === "Enter") {
				searchAndShowRecipes($(this).val());
				inputValueCache = $(this).val();
				tipsContainer.hide();
			}
		});

	tipsContainer.on("mousedown", function (e) {
		e.preventDefault();
		clearTimeout(blurTimer);
	});

	searchIcon.on("click", function () {
		searchAndShowRecipes(searchInput.val());
		inputValueCache = searchInput.val();
		tipsContainer.hide();
	});
});

function searchAndShowRecipes(search) {
	const noResults = $("#no-results");
	const cardContainer = $(".cardContainer");
	const showMoreBtn = $("#show-more");
	const noMoreRecipes = $("#no-more-recipes");

	cardContainer.empty();
	showMoreBtn.hide();
	noMoreRecipes.hide();
	noResults.hide();

	$.ajax({
		url: url + "?search=" + encodeURIComponent(search),
		method: "GET",
		success: (data) => {
			if (data.length === 0) {
				noResults.show();
				return;
			}

			data.forEach((recipe) => {
				cardContainer.append(createCard(recipe));
			});

			page = 2;
			showMoreBtn.show();
		},
		error: (error) => {
			console.error("Search error:", error);
			showAlert("Error searching recipes", "danger");
		},
	});
}

function fillTipsContainer(tips) {
	const tipsContent = $(".tips-content");
	tipsContent.empty();

	tips.slice(0, 5).forEach((tip) => {
		tipsContent.append(`
            <div class="tip-item" onclick="showDetails('${tip.idMeal}')">
                <img src="${tip.strMealThumb}" alt="${tip.strMeal}" class="tip-image">
                <span>${tip.strMeal}</span>
            </div>
        `);
	});
}

function showTips(searchValue) {
	clearTimeout(typingTimer);
	const tipsContainer = $(".tips-container");

	if (!searchValue) {
		tipsContainer.hide();
		return;
	}

	if (inputValueCache === searchValue && tipCache) {
		if (tipCache.length === 0) {
			tipsContainer.hide();
			return;
		}
		tipsContainer.show();
		fillTipsContainer(tipCache);
		return;
	}

	typingTimer = setTimeout(() => {
		$.ajax({
			url: `/api/recipes/tips?search=${searchValue}`,
			method: "GET",
			success: (data) => {
				tipCache = data || [];

				if (tipCache.length === 0) {
					tipsContainer.hide();
					return;
				}

				tipsContainer.show();
				fillTipsContainer(tipCache);
				inputValueCache = searchValue;
			},
			error: (error) => {
				console.error("Tips error:", error);
				tipCache = [];
				tipsContainer.hide();
			},
		});
	}, doneTypingInterval);
}

function showDetails(id) {
	window.location.href = `/recipeDetails?id=${id}`;
}

function createCard(recipe) {
	return `
        <div class="card mb-1">
            <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal
		}" />
            <div class="card-body">
                <h5 class="card-title"><strong>Name: </strong>
                    ${recipe.strMeal}
                </h5>
                <p class="card-text"><strong>Type: </strong>
                    ${recipe.strCategory}
                </p>
                
                <div class="card-footer">
                    <button class="bi ${recipe.isFavorite
			? "bi-star-fill text-warning"
			: "bi-star"
		} favorite"></button>
                    <a href="/recipeDetails?id=${recipe.idMeal
		}"><button class="btn btn-outline-warning">Meal details</button></a>
                </div>
            </div>
        </div>
    `;
}
