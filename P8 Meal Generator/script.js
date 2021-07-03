const submit = document.getElementById('submit');
const search = document.getElementById('search');
const randomBtn = document.getElementById('random-btn');
const resultHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

const searchMeal = (e) => {
  e.preventDefault();
  const searchText = search.value;
  if (searchText.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Results for ${searchText}</h2>`;
        if (data.meals == null) {
          resultHeading.innerHTML = `<h3>No Results Found for ${searchText}</h3>`;
        } else {
          meals.innerHTML = data.meals
            .map(
              (meal) =>
                ` <div class="meal">
            <img src='${meal.strMealThumb}' alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
              </div>
                </div>`
            )
            .join('');
        }
      });
    search.value = '';
  } else {
    alert('Please enter search keyword');
  }
  selectedMeal.innerHTML = '';
};
const getMealId = async (mealId) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await res.json();
  const meal = data.meals[0];
  displaySelectedMeal(meal);
};
const displaySelectedMeal = (meal) => {
  meals.innerHTML = '';
  resultHeading.innerHTML = '';
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]}:${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  selectedMeal.innerHTML = `
  <div class="selected-meal-details">
  <h2>${meal.strMeal}</h2>
  <img src="${meal.strMealThumb}" atl="${meal.strMeal}"/>
  <div class="selected-meal-info" >
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
</div>
<div class="selected-meal-instructions">
  <p>${meal.strInstructions}</p>
  <h3>Ingredients</h3>
  <ul>
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
  </ul>
</div>
  </div>
  `;
};
const randomMeal = (e) => {
  e.preventDefault();
  fetch('https:/www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      let ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]}:${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
      selectedMeal.innerHTML = `
      <div class="selected-meal-details">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" atl="${meal.strMeal}"/>
      <div class="selected-meal-info" >
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="selected-meal-instructions">
      <p>${meal.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
      </div>
      `;
    });
};

submit.addEventListener('submit', searchMeal);
meals.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      false;
    }
  });
  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealid');
    getMealId(mealId);
  }
});
randomBtn.addEventListener('click', randomMeal);
