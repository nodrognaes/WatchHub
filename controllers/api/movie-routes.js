const router = require('express').Router();
const axios = require('axios');

// API routes for user admin - signup, signin


// API routes for other resources - post, favorite
router.get('/', (req , res) => {
  console.log("GET /api/movies")
  
  let apiKey = "&apikey=" + process.env.API_KEY_OMDB;
  let userSearchItem = req.body.user;

  console.log(userSearchItem);
  
  let url = `https://www.omdbapi.com/?s=${userSearchItem}${apiKey}`;
  let urlPlot =
    `https://omdbapi.com/?t=${userSearchItem}&plot=full${apiKey}`;
  let urlActors = `https://omdbapi.com/?t=${userSearchItem}${apiKey}`;

  console.log(url);
  
  axios.get(url, function (apiData) {
    console.log(apiData);

    let title = apiData.Search[0].Title;
    let posterimg = apiData.Search[0].Poster;
    let relatedSearch = apiData.Search[1].Poster;
    let relatedSearch2 = apiData.Search[2].Poster;
    let relatedSearch3 = apiData.Search[3].Poster;
    
    let mainImdb =
      `https://www.imdb.com/title/${apiData.Search[0].imdbID}/`;
    let imdburl1 =
      `https://www.imdb.com/title/${apiData.Search[1].imdbID}/`;
    let imdburl2 =
      `https://www.imdb.com/title/${apiData.Search[2].imdbID}/`;
    let imdburl3 =
      `https://www.imdb.com/title/${apiData.Search[3].imdbID}/`;
      
    res.json({title, posterimg, relatedSearch, relatedSearch2, relatedSearch3, mainImdb, imdburl1, imdburl2, imdburl3})
  });

  router.get('/watch', (req, res) => {
    axios.get(urlPlot, function (apiData) {
      let plot = apiData.Plot;
      let actors = apiData.Actors;
  
      console.log(plot);
      document.getElementById("description").innerHTML = `<p>${plot}</p>`;
      document.getElementById("actors").innerHTML =
        `<h1>Starring:${actors}</h1>`;
    });
  })
  

  $.get(urlActors)
    .then(function (wmData) {
      console.log(wmData);
      let actors = wmData.Actors;
      document.getElementById("actors").innerHTML =
        `<h1>Starring:${actors}</h1><br>`;
      let apiKey = "?apiKey=wGpBK9KbIsOowJePtOn6fJGwwZf9FCMKpREucZEI";
      data = wmData;
      let url2 = `https://api.watchmode.com/v1/search/${apiKey}&search_field=name&search_value=${userSearchItem}`;
      console.log(url2);
      return fetch(url2);
    })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (userData) {
      let wmId = userData.title_results[0].id;
      let apiKey2 = "?apiKey=1uGBLbFfzQEviDnZAowFoMKXgE2cWWYQaYDoBkfj";
      let idUrl = `https://api.watchmode.com/v1/title/${wmId}/details/${apiKey2}`;
      console.log(idUrl);
      $.get(idUrl, function (userData) {
        let runTime = userData.runtime_minutes;
        let releaseDate = userData.release_date;
        let criticScore = userData.critic_score;
        let usRating = userData.us_rating;
        document.getElementById("run-time").innerHTML = `${runTime} min`;
        document.getElementById("release-date").innerHTML = `${releaseDate}`;
        document.getElementById(
          "critic-score"
        ).innerHTML = `${criticScore}/100`;
        document.getElementById("rating").innerHTML = `${usRating}`;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
})


module.exports = router;
