const resultsText = document.getElementById('resultsText');
const searchBox = document.getElementById('searchBox');
const form = document.getElementById('form');
const mealContainer = document.getElementById('meals-container');

function runSearch(e) {
    e.preventDefault();

    //Grab search term

    const term = searchBox.value;
    //check if term is empty:

    if (term.trim() == '') {
        alert('Please Enter a Term!');
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultsText.innerHTML = `Results For: ${term}`;

                if (data.meals === null) {
                    resultsText.innerHTML = `Sorry! There Are No Results For: ${term}`;
                } else {
                    mealContainer.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join('');
                }
            });
            //clear search text
            searchBox.value = '';

    }
}



//Adding Event Listeners

form.addEventListener('submit', runSearch);