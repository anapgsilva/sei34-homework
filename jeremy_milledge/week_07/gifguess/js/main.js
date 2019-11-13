

$(document).ready(function() {
  const rand = function(n) {
    return Math.floor(Math.random() * n)
  }


  const getAdvice = function() {
    $('#fact').text('Use the gifs to guess the wise advice...');
    const url = 'https://api.adviceslip.com/advice';
    $.ajax(url).done(function(obj) {
      const advice = JSON.parse(obj).slip.advice
      console.log(advice);
      current_advice = advice
      getGIFs(advice);
    });
  }

  const revealAdvice = function() {
    $('#fact').text(current_advice);
  }
  const getGIFs = function(text) {
    const urlBase = 'https://api.tenor.com/v1/search?q=';
    const p = nlp(text); //parse text with nlp (compromise.js)
    const verbs = p.verbs().out('array');
    const nouns = p.nouns().out('array');
    const adverbs = p.adverbs().out('array');
    const adjectives = p.adjectives().out('array');
    const allowed = verbs.concat(nouns, adverbs, adjectives); //one array with all valid words/phrases
    console.log("verbs", verbs)
    console.log("nouns", nouns)
    console.log("adverbs", adverbs)
    console.log("adjectives", adjectives)

    allowed.sort(() => .5 - Math.random()) //basic random shuffle

    $('#images').empty()
    allowed.forEach(function(w) {
      $.ajax(urlBase + w).done(function(gif) {
        const path = gif.results[rand(2)].media[0].gif.url
        $('#images').append(`<div class="tile draggable-source"><i class="fas fa-arrows-alt right"></i><input placeholder="Label Me"></input><img src="${path}" ></div>`)

      });
    })
  }
  const swappable = new Draggable.Swappable(document.getElementById('images'), {
    delay: 300,
    mirror: {
      constrainDimensions: true
    },
    plugins: [Draggable.Plugins.ResizeMirror]
  });
  let current_advice;
  getAdvice();
  $('#new').click( getAdvice );
  $('#reveal').click( revealAdvice )

})
