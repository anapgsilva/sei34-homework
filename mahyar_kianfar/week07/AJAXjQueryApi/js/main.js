

$(document).ready(function(){
  const $searchForm = $('form');
  $searchForm.on('submit', function(event){
    event.preventDefault();
    $('.tableBody').empty();
    const name = $('#team').val();
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${ name }`;
    $.ajax(url).done(function (data) {

      const teams = data.teams;
      for (let i = 0; i < teams.length; i++) {
      //console.log(teams[i]['strTeam']['intFormedYear']);
      //console.log(teams[i]['strLeague']['strStadium']);
  // $('h1').after(`<p>${ teams[i]['strTeam']}</p>`, `<p>Formed Year: ${ teams[i]['intFormedYear']}</p>`,
  //   `<p>League: ${ teams[i]['strLeague']}</p>`, `<p>Stadium: ${ teams[i]['strStadium']}</p>`)
  //console.log(teams[i]['strTeam']);
  console.log(`${ teams[i]['strTeam']}`);
    //$("#Team_name").append(`${ teams[i]['strTeam']}`)
    // $("#formed_Year").append(`${ teams[i]['intFormedYear']}`)
    // $("#League").append(`${ teams[i]['strLeague']}`)
    // $("#Stadium").append(`${ teams[i]['strStadium']}`)
    // const $tr = $('<tr>');
    // const $td = $(`<td>${ teams[i]['strTeam']}</td>`);
    // const $td1 = $(`<td>${ teams[i]['intFormedYear']}</td>`);
    // const $td2 = $(`<td>${ teams[i]['strLeague']}</td>`);
    // const $td3 = $(`<td>${ teams[i]['strStadium']}</td>`);
     const $tr = $(
    `<tr>
    <td>${ teams[i]['strTeam'] || ""}</td>
    <td>${ teams[i]['intFormedYear'] || ""}</td>)
    <td>${ teams[i]['strLeague']|| ""}</td>
    <td>${ teams[i]['strStadium'|| ""]}</td>
    </tr>`);
$tr.appendTo('.tableBody');
    }

    //$td.appendTo($tr);
    // $td1.appendTo($tr);$td2.appendTo($tr);$td3.appendTo($tr);



    }).done(function (result) {
      // const value = Object.entries(result)
      // console.log(value);
      // $('h1').after(`<p>${ result['teams'][0]['strTeam']}</p>`);
      // $('h1').after(`<p>Formed Year: ${ result['teams'][0]['intFormedYear']}</p>`);
      //
      // console.log(result);
    }).fail(function () {
      alert('Something bad happen');
    });
});

});
