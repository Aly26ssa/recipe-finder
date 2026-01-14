const searchBox = document.querySelector(".recipe__search-box");
const searchButton = document.querySelector(".recipe__search-btn");
const recipeContainer = document.querySelector(".recipe__container");
const randomButton = document.querySelector(".recipe__random-btn");
const ingredientsContainer= document.querySelector(".ingredients__container");
const ingredientsList= document.querySelector(".ingredients__list");
const ingredientsExitButton= document.querySelector(".ingredients__exit-btn");
const ingredientsDetails = document.querySelector(".ingredients__details");
const messageContainer = document.querySelector(".messageContainer");

// Fetching recipes function
async function fetchRecipes(query) {
    try {
        if (messageContainer) {
            messageContainer.classList.remove('error');
            messageContainer.classList.add('hidden');
            messageContainer.textContent = '';
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        recipeContainer.innerHTML = "";
        if (data.meals) {
            data.meals.forEach((meal) => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe__container-card');
                recipeCard.dataset.id = meal.idMeal;
                recipeCard.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}"/>
                `
                recipeContainer.appendChild(recipeCard);
            });
        } else {
            recipeContainer.innerHTML = "<p>No recipes found. Try another search.</p>";
            if (messageContainer) {
                messageContainer.textContent = 'No recipes found.';
                messageContainer.classList.remove('hidden');
                messageContainer.classList.add('error');
                messageContainer.setAttribute('role', 'alert');
            }
        }
    } catch (error) {
       console.error('Error fetching recipes:', error);
        recipeContainer.innerHTML = "<p>Error loading recipes, please try again.</p>";
        if (messageContainer) {
            messageContainer.textContent = 'Error loading recipes. Please try again.';
            messageContainer.classList.remove('hidden');
            messageContainer.classList.add('error');
            messageContainer.setAttribute('role', 'alert');
        }
    }
}

// Enabling recipe search functionality
searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchRecipe = searchBox.value;
        fetchRecipes(searchRecipe);
});

// Fetching random recipes
async function fetchRandomRecipes() {
    try {
        if (messageContainer) {
            messageContainer.classList.remove('error');
            messageContainer.classList.add('hidden');
            messageContainer.textContent = '';
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        recipeContainer.innerHTML = "";
        if (data.meals) {
            data.meals.forEach((meal) => {
                const randomRecipeCard = document.createElement('div');
                randomRecipeCard.classList.add('recipe__random-card');
                randomRecipeCard.dataset.id = meal.idMeal;
                randomRecipeCard.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}"/>
                `
                recipeContainer.appendChild(randomRecipeCard);
            });
        } else {
            recipeContainer.innerHTML = "<p>No recipes found. Try again.</p>";
            if (messageContainer) {
                messageContainer.textContent = 'No recipes found.';
                messageContainer.classList.remove('hidden');
                messageContainer.classList.add('error');
                messageContainer.setAttribute('role', 'alert');
            }
        }
    } catch (error) {
        console.error('Error fetching random recipe:', error);
        recipeContainer.innerHTML = "<p>Error loading recipes, please try again.</p>";
        if (messageContainer) {
            messageContainer.textContent = 'Error loading recipes. Please try again.';
            messageContainer.classList.remove('hidden');
            messageContainer.classList.add('error');
            messageContainer.setAttribute('role', 'alert');
        }
    }
}

// Enabling random recipe functionality
randomButton.addEventListener('click', (e) => {
    e.preventDefault();
    const randomRecipe = recipeContainer.value;
    fetchRandomRecipes(randomRecipe);
});

// Show ingredients container
function showContainer() {
    ingredientsContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

// Hide ingredients container
function exitContainer() {
    ingredientsContainer.classList.add("hidden");
    document.body.style.overflow = "";
}


// Fetching recipe ingredients 
async function getRecipeDetails(id) {
    try {
        showContainer();

        if (messageContainer) {
            messageContainer.classList.remove('error');
            messageContainer.classList.add('hidden');
            messageContainer.textContent = '';
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.meals) {
            const meal = data.meals[0];
            
            // List ingredients and measurements
            let ingredientsListHtml = '';
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measurement = meal[`strMeasure${i}`];
                if (ingredient) {
                    ingredientsListHtml += `<li>${measurement} ${ingredient}</li>`;
                }
            }
            
            // Populate the recipe details
            ingredientsDetails.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <h3>Category: ${meal.strCategory}</h3>
                <h3>Cuisine: ${meal.strArea}</h3>
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredientsListHtml}
                </ul>
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
            `;
        } else {
            if (messageContainer) {
                messageContainer.textContent = 'Details not found.';
                messageContainer.classList.remove('hidden');
                messageContainer.classList.add('error');
                messageContainer.setAttribute('role', 'alert');
            }
        }
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        if (messageContainer) {
            messageContainer.textContent = 'Error loading details, please try again.';
            messageContainer.classList.remove('hidden');
            messageContainer.classList.add('error');
            messageContainer.setAttribute('role', 'alert');
        }
    }
}

// Enabling Recipe Details pop up
recipeContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const card = e.target.closest('.recipe__container-card, .recipe__random-card');

    if (card) {
        const recipeId = card.dataset.id;
        getRecipeDetails(recipeId);
    }
});

// Close ingredients button functionality
ingredientsExitButton.addEventListener('click', exitContainer);


