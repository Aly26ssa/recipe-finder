# 🍳 Random Recipe Finder

A simple and responsive web application that allows users to search for delicious recipes. This project fetches data from [TheMealDB API](https://www.themealdb.com) to display meal suggestions including names and thumbnail images.

## 📸 Screenshot

![Project Screenshot](path/to/your/screenshot.png)
*(Note: Upload a screenshot of your app to your repo and link it here)*

## ✨ Features

* **Recipe Search:** Users can input keywords to find specific meals.
* **Dynamic Results:** Fetches and renders recipe cards asynchronously.
* **Responsive Design:** specific layouts for different screen sizes using CSS Grid and Flexbox.
* **Modern UI:** Clean styling with hover effects and CSS variables.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** Flexbox, Grid, and Custom Properties (Variables).
* **JavaScript (ES6+):** `async/await`, Fetch API, and DOM manipulation.
* **API:** TheMealDB (Free open source recipe database).

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/random-recipe.git](https://github.com/your-username/random-recipe.git)
    ```

2.  **Navigate to the project directory**
    ```bash
    cd random-recipe
    ```

3.  **Launch the application**
    * Since this project uses ES6 Modules (`<script type="module" ...>`), you need to run it via a local server to avoid CORS errors.
    * **VS Code Users:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
    * **Python Users:** Run `python -m http.server 8000` in the terminal and open `localhost:8000`.

## 📂 Project Structure

```text
random-recipe/
├── index.html      # Main HTML structure
├── style.css       # CSS styling and layout
├── script.js       # Logic for fetching API data
└── README.md       # Project documentation