 let groupCount = 0;
    const load_all_food = () =>{
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
        display_food(data.meals)
    });
        
    }
    const display_food = (food) =>{
      const foodContainer = document.getElementById('food-container');
      foodContainer.innerHTML = '';
      const message = document.getElementById('message');
        if (food.length > 0) {
            message.innerText = '';
        } 
        else 
        {
            message.innerText = 'No Food in that name found';
        }
      food.forEach(food => 
        {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <img class="food-img" src="${food.strMealThumb}" alt="" />
          <h5>${food.strMeal}</h5>
          <p>${food.strCategory}</p>
          <p>${food.strInstructions.slice(0,15)}...</p>
          <button onclick="handleAddToGroup('${food.strMeal}')">Add to Group</button>
          <button onclick="showDetails('${food.idMeal}')">Details</button>
        `;
        foodContainer.appendChild(div);
      });
    };

    const handleAddToGroup = (name) =>{
      if(groupCount >= 5) {
        alert("Cannot add more than 5 food to the group.");
        return;
      }
      groupCount++;
      document.getElementById("items-no").innerText = groupCount;
      const container = document.getElementById("cart-main-container")
      const div = document.createElement("div")
      div.classList.add('cart-info')
      div.innerHTML = `<p>${name}</p>`;
      container.appendChild(div);
    };

    const searchFood =() =>{
      const input = document.getElementById('search-input').value;
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(response => response.json())
        .then(data => {
          if(!data.meals) {
            display_food([]);
          } 
          else {
            display_food(data.meals);
          }
        });
    };

    const showDetails = (id)=>{
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data =>{
          const food = data.meals[0];
          const modal = document.getElementById('modal');
          modal.style.display = 'block';
          modal.innerHTML = `
            <h2>${food.strMeal}</h2>
            <p>Category: ${food.strCategory}</p>
            <p>Area: ${food.strArea}</p>
            <p>Instructions: ${food.strInstructions.slice(0,50)}</p>
            <p>Ingredient 1: ${food.strIngredient1}</p>
            <button onclick="document.getElementById('modal').style.display='none'">Close</button>
          `;
        });
    };

    load_all_food();