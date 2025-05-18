document.addEventListener('DOMContentLoaded', () => {
    initRecipeForm();
    initViewRecipesButton();
    initShoppingList();
    initSearch();
    initMealPlanner();
});

// Bevásárlólista generálása
function initShoppingList() {
    const shoppingListButton = document.getElementById('generate-shopping-list');
    if (!shoppingListButton) return;

    shoppingListButton.addEventListener('click', generateShoppingList);
}

function generateShoppingList() {
    const shoppingListItems = document.getElementById('shopping-list-items');
    if (!shoppingListItems) return;

    shoppingListItems.innerHTML = ''; // Töröljük a meglévő elemeket

    // Bevásárlólista elemek
    const ingredients = ['Tojás', 'Liszt', 'Tej', 'Cukor'];
    ingredients.forEach((ingredient) => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        shoppingListItems.appendChild(listItem);
    });

    console.log('Bevásárlólista generálva:', ingredients);
}

// Recept hozzáadása
function initRecipeForm() {
    const recipeForm = document.getElementById('recipe-form');
    if (!recipeForm) return;

    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const imageInput = document.getElementById('image');
        let imageUrl = '';
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageUrl = e.target.result;

                // Recept adatok begyűjtése
                const recipe = {
                    name: document.getElementById('recipe-name').value,
                    category: document.getElementById('category').value,
                    prepTime: document.getElementById('prep-time').value,
                    tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
                    ingredients: document.getElementById('ingredients').value,
                    instructions: document.getElementById('instructions').value,
                    image: imageUrl, // A kép adatainak mentése
                };

                let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
                recipes.push(recipe);
                localStorage.setItem('recipes', JSON.stringify(recipes));

                alert('Recept sikeresen elmentve!');
                recipeForm.reset();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            alert('Kérlek, tölts fel egy képet!');
        }
    });
}



// Meglévő receptek megjelenítése
function initViewRecipesButton() {
    const viewRecipesButton = document.getElementById('view-recipes-button');
    if (!viewRecipesButton) return;

    viewRecipesButton.addEventListener('click', displayRecipes);
}

function displayRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeList = document.getElementById('recipe-list');
    if (!recipeList) {
        console.error('Nem található a #recipe-list elem!');
        return;
    }

    recipeList.innerHTML = ''; // Töröljük a meglévő elemeket

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>Nincsenek elmentett receptek.</p>';
        return;
    }

    recipes.forEach((recipe) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${recipe.name}</strong> (${recipe.category}) - ${recipe.prepTime} perc<br>
            <em>Címkék:</em> ${recipe.tags.join(', ')}<br>
            <em>Összetevők:</em> ${recipe.ingredients}<br>
            <em>Elkészítés:</em> ${recipe.instructions}<br>
            ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" style="max-width: 200px; margin-top: 10px;">` : ''}
        `;
        recipeList.appendChild(listItem);
    });

    console.log('Receptek megjelenítve:', recipes);
}


function generateShoppingList() {
    const shoppingListItems = document.getElementById('shopping-list-items');
    if (!shoppingListItems) return;

    shoppingListItems.innerHTML = ''; // Töröljük a meglévő elemeket

    const ingredients = ['Tojás', 'Liszt', 'Tej', 'Cukor'];
    ingredients.forEach((ingredient) => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        shoppingListItems.appendChild(listItem);
    });

    console.log('Bevásárlólista generálva:', ingredients);
}

// Keresés funkció
function initSearch() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    if (!searchButton || !searchInput) return;

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            console.log('Keresési kifejezés:', query);
        } else {
            alert('Kérlek, adj meg egy keresési kifejezést!');
        }
    });
}

// Étkezési terv funkció
function initMealPlanner() {
    const mealPlannerContainer = document.querySelector('.meal-planner-container');
    if (!mealPlannerContainer) return;

    mealPlannerContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        mealPlannerContainer.classList.add('drag-over');
    });

    mealPlannerContainer.addEventListener('dragleave', () => {
        mealPlannerContainer.classList.remove('drag-over');
    });

    mealPlannerContainer.addEventListener('drop', (event) => {
        event.preventDefault();
        mealPlannerContainer.classList.remove('drag-over');
        const recipeId = event.dataTransfer.getData('text/plain');
        const recipeElement = document.createElement('div');
        recipeElement.textContent = `Recept ID: ${recipeId}`;
        mealPlannerContainer.appendChild(recipeElement);
        console.log('Recept hozzáadva az étkezési tervhez:', recipeId);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initRecipeForm();
    initViewRecipesButton();
    initShoppingList();
    initSearch();
    initMealPlanner();
});

// Keresés funkció
function initSearch() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchButton || !searchInput || !searchResults) return;

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = ''; // Töröljük a korábbi keresési eredményeket

        if (!query) {
            searchResults.innerHTML = '<li>Kérlek, adj meg egy keresési kifejezést!</li>';
            return;
        }

        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.ingredients.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query))
        );

        if (filteredRecipes.length === 0) {
            searchResults.innerHTML = '<li>Nincs találat a keresési kifejezésre.</li>';
            return;
        }

        filteredRecipes.forEach(recipe => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${recipe.name}</strong> (${recipe.category})<br>
                <em>Összetevők:</em> ${recipe.ingredients}<br>
                <em>Címkék:</em> ${recipe.tags.join(', ')}
            `;
            searchResults.appendChild(listItem);
        });

        console.log('Keresési eredmények:', filteredRecipes);
    });
}