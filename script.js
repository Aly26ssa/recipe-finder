const searchBox = document.querySelector(".recipe__search-box");
const searchButton = document.querySelector(".recipe__search-btn");
const recipeContainer = document.querySelector(".recipe__container");
const randomButton = document.querySelector(".recipe__random-btn");
const ingredientsContainer= document.querySelector(".ingredients__container");
const ingredientsList= document.querySelector(".ingredients__list");
const ingredientsExitButton= document.querySelector(".ingredients__exit-btn");
const ingredientsDetails = document.querySelector(".ingredients__details");

// Function to create recipe card
function createRecipeCard(meal, isRandom = false) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add(isRandom ? 'recipe__random-card' : 'recipe__container-card');
    recipeCard.dataset.id = meal.idMeal;
    
    const title = document.createElement('h2');
    title.textContent = meal.strMeal;
    
    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    
    recipeCard.appendChild(title);
    recipeCard.appendChild(img);
    
    return recipeCard;
}

// Fetching recipes function
async function fetchRecipes(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        recipeContainer.textContent = "";
        
        if (data.meals) {
            data.meals.forEach((meal) => {
                const recipeCard = createRecipeCard(meal);
                recipeContainer.appendChild(recipeCard);
            });
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipeContainer.textContent = "";
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
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        recipeContainer.textContent = "";
        
        if (data.meals) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('random-recipe-wrapper');
            
            data.meals.forEach((meal) => {
                const randomRecipeCard = createRecipeCard(meal, true);
                wrapper.appendChild(randomRecipeCard);
            });
            
            recipeContainer.appendChild(wrapper);
        }
    } catch (error) {
        console.error('Error fetching random recipe:', error);
        recipeContainer.textContent = "";
    }
}

// Enabling random recipe functionality
randomButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchRandomRecipes();
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

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.meals) {
            const meal = data.meals[0];
            
            // Clear previous details
            ingredientsDetails.textContent = "";
            
            // Create title
            const title = document.createElement('h2');
            title.textContent = meal.strMeal;
            
            // Create image
            const img = document.createElement('img');
            img.src = meal.strMealThumb;
            img.alt = meal.strMeal;
            
            // Create category
            const category = document.createElement('h3');
            category.textContent = `Category: ${meal.strCategory}`;
            
            // Create cuisine
            const cuisine = document.createElement('h3');
            cuisine.textContent = `Cuisine: ${meal.strArea}`;
            
            // Create ingredients heading
            const ingredientsHeading = document.createElement('h3');
            ingredientsHeading.textContent = 'Ingredients:';
            
            // Create ingredients list
            const ul = document.createElement('ul');
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measurement = meal[`strMeasure${i}`];
                if (ingredient) {
                    const li = document.createElement('li');
                    li.textContent = `${measurement} ${ingredient}`;
                    ul.appendChild(li);
                }
            }
            
            // Create instructions heading
            const instructionsHeading = document.createElement('h3');
            instructionsHeading.textContent = 'Instructions:';
            
            // Create instructions paragraph
            const instructions = document.createElement('p');
            instructions.textContent = meal.strInstructions;
            
            // Append all elements
            ingredientsDetails.appendChild(title);
            ingredientsDetails.appendChild(img);
            ingredientsDetails.appendChild(category);
            ingredientsDetails.appendChild(cuisine);
            ingredientsDetails.appendChild(ingredientsHeading);
            ingredientsDetails.appendChild(ul);
            ingredientsDetails.appendChild(instructionsHeading);
            ingredientsDetails.appendChild(instructions);
        }
    } catch (error) {
        console.error('Error fetching recipe details:', error);
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
