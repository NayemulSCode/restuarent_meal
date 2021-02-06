
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then(res => res.json())
    .then(data => {
        displayMeal(data.meals);
    })


const displayMeal = meals =>{
    // for (let i = 0; i < meals.length; i++) {
    //     const meal = meals[i];
    //     console.log(meal.strMeal)
    // }
    meals.forEach(meal => {
        const mealsDiv = document.getElementById('mealDetails');
        const mealDiv = document.createElement('div');
        mealDiv.className = "meal"
        const mealInfo =`
            <div  onClick="displayMealDetails('${meal.idMeal}')">
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            </div>
        `
        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);

        //console.log(meal.strMeal)
    });
}

const displayMealDetails = idMeal =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    //console.log(url);
    fetch(url)
    .then(res => res.json())
    //.then(data => console.log(data.meals))
    .then(data => renderMealDetailsInfo(data.meals[0]))
}

const renderMealDetailsInfo = meal =>{
    const ingredients = [];
    for(let i=1; i<=20; i++) {
        if(meal[`strIngredient${i}`]) {
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
          // Stop if no more ingredients
          break;
        }
      }
    const mealInfo = document.getElementById('mealDetailsInfo');
    mealInfo.innerHTML =`
        <img src="${meal.strMealThumb}" >
        <h4>Area: ${meal.strArea}</h4>
        <h4>Category: ${meal.strCategory}</h4>
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h5>Ingredients:</h5>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <p><strong>Instructions: </strong> ${meal.strInstructions}</p>
    `
    
}








// const displayMenu = meals =>{
//     const mealsDiv = document.getElementById('mealDetails');
//    meals.forEach(strMeal => {
//         const mealDiv = document.createElement('div');
//         mealDiv.className = "meal"
//         const mealInfo = `
//             <h2>${meals.strMeal}</h2>
//         `
//         mealDiv.innerHTML = mealInfo
//         mealsDiv.appendChild(mealDiv);
//         console.log(strMeal)

//     });
// }

// const menuDetails = Arrabiata =>{
// const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${Arrabiata}`
// fetch(url)
// .then(res => res.json())
// .then(data => console.log(data[0]));
// }
