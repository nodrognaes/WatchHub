let containerDiv = document.getElementById("container");
let searchBtn = document.getElementById("searchBtn");
let data;
let userInput = document.querySelector("#userQuery");
const callApi = require('../../controllers/api/movie-routes');

$(document).ready(function() {
  $('#streaming').hide();
})
$(document).ready(function() {
  $('#stats').hide();
})
$(document).ready(function() {
  $('#poster').hide();
})
$(document).ready(function() {
  $('#related').hide();
})
$(document).ready(function() {
  $('#searchBtn').on('click', function () {
      $('#streaming').show();
      $('#stats').show();
      $('#poster').show();
      $('#related').show();
  })
})

document.querySelector("#searchBtn").addEventListener("click", () => {
  callApi();
});

userInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("searchBtn").click();
  }
});

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  axios.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
});

