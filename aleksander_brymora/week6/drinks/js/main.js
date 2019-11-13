let uniqueJumboId = 0;

$('#risky').click(function () {
	addSpinner();
	$.ajax('https://www.thecocktaildb.com/api/json/v1/1/random.php').done(function (data) {
		console.log(data);
		jumbotron(data.drinks[0]);
	});
});

const $searchForm = $('form');

$searchForm.on('submit', function (event) {
	event.preventDefault();
	addSpinner();
	const coctailName = $('#coctail-name').val();
	if (coctailName !== '') {
		const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctailName}`;
		$.ajax(url).done(function (data) {
			data.drinks.forEach(drink => {
				console.log(drink);
				jumbotron(drink);
			});
		})
	}
});

// Creating jumbotrons (damn that sounds cool)
function jumbotron(data) {
	const $jumb = $('<div>')
		.addClass('jumbotron row')
		.attr('id', `jumbo${uniqueJumboId}`);

	uniqueJumboId++;

	const jumbLeft = $('<div class="col-7"> </div>')
		.appendTo($jumb);

	$('<h1>')
		.addClass('display-4')
		.text(data['strDrink'])
		.appendTo(jumbLeft);

	$('<h2>')
		.addClass('font-italic')
		.text(data['strCategory'])
		.appendTo(jumbLeft);

	$('<h5>')
		.addClass('mt-5')
		.text('Instructions')
		.appendTo(jumbLeft);

	$('<p>')
		.addClass('lead')
		.text(data['strInstructions'])
		.appendTo(jumbLeft);

	const jumbRight = $('<div class="col-5"> </div>')
		.appendTo($jumb);

	$("<img>")
		.attr('src', data["strDrinkThumb"])
		.addClass('w-100 rounded')
		.appendTo(jumbRight)

	const $jumbMore = $('<div>')
		.addClass('w-100 p-2')
		.appendTo($jumb);

	$('<hr>')
		.appendTo($jumbMore);

	// Ingredients
	$('<h5>')
		.text('Ingredients')
		.appendTo($jumbMore);

	const inglist = $('<ul>')
		.addClass('list-unstyled')

	let ingredientCount = 1;
	while (data[`strIngredient${ingredientCount}`] !== null) {
		$('<li>')
			.text(data[`strIngredient${ingredientCount}`] +
				" - " +
				data[`strMeasure${ingredientCount}`]
			)
			.appendTo(inglist);

		ingredientCount++;
	}
	inglist.appendTo($jumbMore);

	$($jumb)
		.hide()
		.appendTo('.container')
		.fadeIn();

	const spinner = $('#spinner-icon');
	spinner.fadeOut(300, function () {
		spinner.remove();
	});
	
	$('html, body').delay(800).animate({
		scrollTop: $jumb.offset().top
	}, 1000);
}

function addSpinner() {
	const spinner = $('<div>')
		.addClass('spinner-border text-secondary')
		.attr('role', 'status')
		.attr('id', 'spinner-icon')
		.hide()
		.appendTo($('#spinner'));

	$('<span>')
		.addClass('sr-only')
		.text('loading')
		.appendTo(spinner);

	spinner.fadeIn(300);
}