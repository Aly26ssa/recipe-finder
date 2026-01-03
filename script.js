const searchBox = document.querySelector(".recipe__search-box");
const searchButton = document.querySelector(".recipe__search-btn");
const recipeContainer = document.querySelector(".recipe__container");
const randomButton = document.querySelector(".recipe__random-btn");

// Fetching recipes function
async function fetchRecipes(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    recipeContainer.innerHTML = "";
    data.meals.forEach((meal) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe__container-card');
        recipeCard.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}"/>
        `
        recipeContainer.appendChild(recipeCard);
    });

    // console.log(data.meals[0]);
};

// Enabling recipe search functionality
searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchRecipes = searchBox.value;
        fetchRecipes(searchRecipes);
});

// Fetching random recipes
async function fetchRandomRecipes() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await response.json();
    // console.log(data.meals[0]);
    
};

randomButton.addEventListener('click', (e) => {
    e.preventDefault();
    // const randomRecipes = recipeContainer;
    fetchRandomRecipes(randomRecipes);

});
