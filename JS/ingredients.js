import { ingredientsContainer, ingredientsDetails } from './classNames.js';

function showContainer() {
    ingredientsContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

// Recipe ingredients
export async function getRecipeDetails(id) {
    try {
        showContainer();

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.meals) {
            const meal = data.meals[0];
            
            ingredientsDetails.textContent = "";
            
            // REcipe Title
            const title = document.createElement('h2');
            title.textContent = meal.strMeal;
            
            // Recipe Image
            const img = document.createElement('img');
            img.src = meal.strMealThumb;
            img.alt = meal.strMeal;
            
            // Recipe category
            const category = document.createElement('h3');
            category.textContent = `Category: ${meal.strCategory}`;
            
            // Recipe cusine
            const cuisine = document.createElement('h3');
            cuisine.textContent = `Cuisine: ${meal.strArea}`;
            
            // Ingredients Title
            const ingredientsHeading = document.createElement('h3');
            ingredientsHeading.textContent = 'Ingredients:';
            
            // Ingredients list
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
            
            // Instructions h3
            const instructionsHeading = document.createElement('h3');
            instructionsHeading.textContent = 'Instructions:';
            
            // Recipe instructions
            const instructions = document.createElement('p');
            instructions.textContent = meal.strInstructions;
            
            // Append elements
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