import { searchButton, recipeContainer, searchBox } from './classNames.js';
import { getRecipeDetails } from './ingredients.js';

// Function to create recipe card
export function createRecipeCard(meal, isRandom = false) {
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

// Enabling recipe details pop up
recipeContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const card = e.target.closest('.recipe__container-card, .recipe__random-card');

    if (card) {
        const recipeId = card.dataset.id;
        getRecipeDetails(recipeId);
    }
});


