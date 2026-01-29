import { randomButton } from './classNames.js';
import { recipeContainer } from './classNames.js';
import { createRecipeCard } from './script.js';

export async function fetchRandomRecipes() {
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