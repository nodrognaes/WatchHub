let containerDiv = document.getElementById("container");
let searchBtn = document.getElementById("searchBtn");
let data;
let userInput = document.querySelector("#userQuery");

// const callApi = require('../../controllers/api/movie-routes');

$(document).ready(function () {
  $("#streaming").hide();
  $("#stats").hide();
  $("#poster").hide();
  $("#related").hide();
  $("#searchBtn").on("click", function () {
    $("#streaming").show();
    $("#stats").show();
    $("#poster").show();
    $("#related").show();
  });

  document.querySelector("#searchBtn").addEventListener("click", () => {
    let userChoice = userInput.value.trim();
    console.log("userChoice", userChoice);
    // $.ajax({
    //   url: "/api/movies",
    //   data: {user: userChoice },
    //   method: 'GET'
    // })
    const data = {
      user: userChoice,
    };

    fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((status) => status.json())
      .then((data) => {
        let title = data.title;
        let posterimg = data.posterimg;
        let relatedSearch = data.relatedSearch;
        let relatedSearch2 = data.relatedSearch2;
        let relatedSearch3 = data.relatedSearch3;

        let mainImdb = `${data.mainImdb}`;
        let imdburl1 = `${data.imdburl1}`;
        let imdburl2 = `${data.imdburl2}`;
        let imdburl3 = `${data.imdburl3}`;

        let plot = data.watch.plot;
        let actors = data.watch.actors;
        let runTime = data.watch2.runTime;
        let releaseDate = data.watch2.releaseDate;
        let criticScore = data.watch2.criticScore;
        let usRating = data.watch2.usRating;
        
        document.getElementById("movietitle").innerHTML = `<h1>${title}</h1>`;
        console.log(data);
        document.getElementById("result").innerHTML =
        `<h1><a target="_blank" href="${mainImdb}
        "><img src="${posterimg}"></a></h1>`;
        document.getElementById("relatedsearch").innerHTML =
        `<h1><a target="_blank" href="${imdburl1}"><img id="relatedimg" src="${relatedSearch}"></a></h1>`;
        document.getElementById("relatedsearch2").innerHTML =
        `<h1><a target="_blank" href="${imdburl2}"><img id="relatedimg" src="${relatedSearch2}"></a></h1>`;
        document.getElementById("relatedsearch3").innerHTML =
        `<h1><a target="_blank" href="${imdburl3}"><img id="relatedimg" src="${relatedSearch3}"></a></h1>`;

        document.getElementById("description").innerHTML = `<p> ${plot}</p>`;
        document.getElementById("actors").innerHTML =
        `<h1>Starring: ${actors}</h1>`;

        document.getElementById("run-time").innerHTML = `${runTime} min`;
        document.getElementById("release-date").innerHTML = `${releaseDate}`;
        document.getElementById("critic-score").innerHTML = `${criticScore}/100`;
        document.getElementById("rating").innerHTML = `${usRating}`;
      });
      
  });

  userInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      document.getElementById("searchBtn").click();
    }
  });
  $.get("/api/auth/user_data").then(data => {
    $(".member-name").text(data.name);
  })
});
