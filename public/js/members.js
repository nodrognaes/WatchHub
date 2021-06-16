let containerDiv = document.getElementById("container");
let searchBtn = document.getElementById("searchBtn");
let data;
let userInput = document.querySelector("#userQuery");
const callApi = require('../../controllers/api/movie-routes');

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
    $.get("/api/movies", {user: userInput.val().trim() }).then((data) => {
      // $(".member-name").text(data.email);
      console.log(data);
    });

    $.get('/api/watch')
  });

  userInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      document.getElementById("searchBtn").click();
    }
  });
});


