let response
$.ajax('https://www.reddit.com/r/drumkits.json').done(function (data) {
	console.log(data);
	response = data
	for (let i = 2; i < 12; i++) {
		console.log(data.data.children[i].data.url);
	}
});