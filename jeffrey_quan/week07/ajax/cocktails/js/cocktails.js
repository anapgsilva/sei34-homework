// https://www.thecocktaildb.com/api.php

$(document).ready(function() {
  const $searchForm = $('form');

  $searchForm.on('submit', function(event) {
    event.preventDefault();
    $('#result').empty();
    const cocktailName = $('#cocktail_name').val();

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ cocktailName }`

    $.ajax(url).done(function (data) {
      console.log( data );
      if ( data.drinks == null ) {
        $('#result').append('<p>No results found.</p>');
      } else {
        data.drinks.forEach(function(e) {
          let $drinkDiv = $('<div>').addClass('drink');
          const $name = `<h2>${ e.strDrink }</h2>`;
          $drinkDiv.append( $name );

          let $infoDiv = $('<div>').addClass('drink-info');
          const $image = `<div class="image"><img src=${e.strDrinkThumb} alt='${ e.strDrink }'></div>`;

          $infoDiv.append( $image );

          let $textDiv = $('<div class="text"></div>');

          let $ingredientsDiv = $('<div><h3>Ingredients:</h3></div>').addClass('ingredients');
          let $list = $('<ul>');
          let i = 1
          while (e[`strIngredient${ i }`] !== null) {
            measure = e[`strMeasure${ i }`];
            ingredient = e[`strIngredient${ i }`]
            if (measure !== null) {
              $listItem = `<li>${ ingredient } - ${ measure }</li>`;
              $list.append($listItem);
            }
            i++
          };

          $instructions = $(`<div class="instructions"><h3>Instructions:</h3>${ e['strInstructions'] }</div>`);

          $ingredientsDiv.append($list);
          $textDiv.append($ingredientsDiv);
          $textDiv.append($instructions);
          $infoDiv.append($textDiv);

          $drinkDiv.append($infoDiv);
          $('#result').append($drinkDiv);
        })
      }
    })
  })
})
