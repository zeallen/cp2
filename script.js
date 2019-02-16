document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + value + "&APPID=1";
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            printDrink(json);
        });
});

document.getElementById("random").addEventListener("click", function (event) {
    console.log("YAY");
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            printDrink(json);
        });
});

document.getElementById("nonAlcoholic").addEventListener("click", function (event) {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            printNonAlcoholic(json);
        });
});


function printNonAlcoholic(json) {
    let results = '<section class="portfolio">';
    for (let i = 0; i < 58; i++) {
        results += '<div class="image_grid">'
        results += '<h4>' + json.drinks[i].strDrink + "</h4>";

        results += '<img src="' + json.drinks[i].strDrinkThumb + '"/>';
        results += '</div>';
    }
    results += "</section>";

    document.getElementById("drinkResults").innerHTML = results;
}

function printDrink(json) {
    let results = '<div class="drink_info">';
    results += '<h2>Drink name: ' + json.drinks[0].strDrink + "</h2>";
    if (json.drinks[0].strAlcoholic == "Alcoholic") {
        results += '<h1>WARNING! IT\'S ALCOHOLIC!</h1>';
    }
    results += '<img src="' + json.drinks[0].strDrinkThumb + '"/>';
    results += '<h4>Ingredients: </h4> <ul>';
    for (let i = 1; i < 15; i++) {
        let ingredID = 'strIngredient' + i;
        if (json.drinks[0][ingredID] != "" && json.drinks[0][ingredID] != "null") {
            console.log('ID: ' + ingredID + ' Ingredient: ' + json.drinks[0][ingredID]);
            results += '<li>' + json.drinks[0][ingredID] + '</li>'
        }
    }
    results += '</ul> <h4>Instructions: </h4>';
    results += '<p>' + json.drinks[0].strInstructions + '</p>';

    results += '</div>';
    document.getElementById("drinkResults").innerHTML = results;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
