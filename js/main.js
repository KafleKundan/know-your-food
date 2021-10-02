const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'a0607a5b';
const APP_KEY = '5762953d81e735f6d9b69d58489f88a3';
let title = "";
const heading = document.getElementById('brand')
const nachahineyHeading = document.querySelector('.brand');


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    title = " :) " + searchQuery.toUpperCase() + " (: ";

    fetchAPI()
})

async function fetchAPI() {
    const baseURL = ` https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&type=public&to=30`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    let generatedHTML = '';

    results.map(result => {
        generatedHTML +=
            `
                <div class="item" data-aos="fade-up">
                    <div class="partition">
                        <img src="${result.recipe.image}" alt="">
                        <div class="flex-container">
                            <h1 class="title">${result.recipe.label}</h1>
                            <p class="item-data">Calories: ${parseInt(result.recipe.calories)}</p>
                            <P class="item-data">Cuisine Type: ${((JSON.stringify(result.recipe.cuisineType)).toUpperCase()).slice(2,-2)}</P>
                        </div>
                    </div>
                    <a href="${result.recipe.url}" target="_blank" class="view-button">View Recipe</a>
                    
                </div>
            `

    })
    searchResultDiv.innerHTML = generatedHTML;
    heading.innerHTML = title;
    heading.style.display = "block";
    nachahineyHeading.style.display = 'none';

}