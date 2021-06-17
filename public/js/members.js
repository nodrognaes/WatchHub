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
     console.log('userChoice', userChoice)
    // $.ajax({ 
    //   url: "/api/movies", 
    //   data: {user: userChoice },
    //   method: 'GET'
    // })
    const data = {
      user: userChoice
    }

    fetch('/api/movies',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
    } )
    .then((status) => status.json() )
    .then((data) => {
      // $(".member-name").text(data.email);
      console.log(data);
    });


  });

  userInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      document.getElementById("searchBtn").click();
    }
  });
});


