const resultsText = document.getElementById('resultsText');
const searchBox = document.getElementById('searchBox');
const form = document.getElementById('form');
const mealContainer = document.getElementById('meals-container');
const mealInfoContainer = document.getElementById('mealInfoContainer')
const overlayScreen = document.getElementById('overlayscreen');

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

function findFoodByID(id) {
    //fetches meal by id number:
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

function addMealToDOM(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    //adding meal info to html:
    mealInfoContainer.innerHTML = `
        <div class="single-meal">
            <div class="meal-info-img">
                <h1><em>${meal.strMeal}</em></h1>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal} />
            </div>
            <div class="ingredients-container">
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            <div class="single-meal-info">
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `;
    overlayScreen.style.display = 'block';

}

//Adding Event Listeners

form.addEventListener('submit', runSearch);

mealContainer.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        findFoodByID(mealID);
    }
});

window.onclick = function(event) {
    if (event.target == overlayScreen) {
        overlayScreen.style.display = 'none';
    }
}

// ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
// ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}