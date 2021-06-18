const router = require("express").Router();
const axios = require("axios");

// API routes for user admin - signup, signin

// API routes for other resources - post, favorite
router.post("/", (req, res) => {
  console.log("POST /api/movies");

  let apiKey = "&apikey=" + process.env.API_KEY_OMDB;
  let apiKey2 = "?apiKey=" + process.env.API_KEY_WATCH;

  console.log(apiKey)

  let userSearchItem = req.body.user;
  // console.log("req.body", req.body);

  console.log('userSearchItem', userSearchItem);

  let url = `https://www.omdbapi.com/?s=${userSearchItem}${apiKey}`;
  let urlPlot = `https://omdbapi.com/?t=${userSearchItem}&plot=full${apiKey}`;
  let urlActors = `https://omdbapi.com/?t=${userSearchItem}${apiKey}`;
  

  console.log(url);

  axios.get(url).then(async function (apiData) {
    // console.log(apiData);

    let title = apiData.data.Search[0].Title;
    let posterimg = apiData.data.Search[0].Poster;
    let relatedSearch = apiData.data.Search[1].Poster;
    let relatedSearch2 = apiData.data.Search[2].Poster;
    let relatedSearch3 = apiData.data.Search[3].Poster;

    let mainImdb = `https://www.imdb.com/title/${apiData.data.Search[0].imdbID}/`;
    let imdburl1 = `https://www.imdb.com/title/${apiData.data.Search[1].imdbID}/`;
    let imdburl2 = `https://www.imdb.com/title/${apiData.data.Search[2].imdbID}/`;
    let imdburl3 = `https://www.imdb.com/title/${apiData.data.Search[3].imdbID}/`;

    console.log("urlPlot", urlPlot);
    let watch = await getOmdb(urlPlot);

    let urlMode = `https://api.watchmode.com/v1/search/${apiKey2}&search_field=name&search_value=${userSearchItem}`;
    console.log("urlMode:", urlMode); 
    const watch2 = await getWatchMode(urlMode, userSearchItem);
    // const watch3 = await getMovieDB(idUrl, userSearchItem);
    console.log("watch", watch);
    console.log("watch2", watch2);
    // console.log("watch3", watch3)

    res.json({
      title,
      posterimg,
      relatedSearch,
      relatedSearch2,
      relatedSearch3,
      mainImdb,
      imdburl1,
      imdburl2,
      imdburl3,
      watch,
      watch2
    });
  });

  async function getOmdb(url) {
    console.log("getOmdb");
    const apiData = await axios.get(url);

    // console.log("apiData", apiData);
    let plot = apiData.data.Plot;
    let actors = apiData.data.Actors;

    console.log("plot", plot);

    return { plot, actors };
  }

  async function getWatchMode(url, search) {
    console.log("getWatchMode");

    try {
      const userData = await axios.get(url);

      // console.log("userData", userData);
      let wmId = userData.data.title_results[0].id;
      console.log("wmId", wmId);

      let apiKey2 = "?apiKey=" + process.env.API_KEY_WATCH;
      let idUrl = `https://api.watchmode.com/v1/title/${wmId}/details/${apiKey2}`;
      console.log("idUrl:", idUrl);
      const userData2 = await axios.get(idUrl);
      // console.log('userData2', userData2)
      let runTime = userData2.data.runtime_minutes;
      let releaseDate = userData2.data.release_date;
      let criticScore = userData2.data.critic_score;
      let usRating = userData2.data.us_rating;
      return { runTime, releaseDate, criticScore, usRating, wmId };
    } catch (err) {
      console.log(err);
    };
  }
  // async function getMovieDB(url, search) {
  //   console.log("getMovieDB");

  //   try {
  //     const movieData = await axios.get(url);
  //     console.log("movieData", movieData);

  //     let movieID = movieData.data.imdb_id;
  //     console.log("movieID", movieID);
  //     let apiKey3 = process.env.API_KEY_MOVIE;
  //     let idUrl = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey3}&language=en-US`;
  //     console.log("idUrl:", idUrl);
  //     const userData2 = await axios.get(idUrl);
  //     console.log('userData2', userData2)
  //     const movieData2 = await axios.get(idUrl)
  //     console.log("idUrl", idUrl)
  //     let key = movieData2.data.results.key
  //     return { key };
  //   } catch (err) {
  //     console.log(err);
  //   };
  // }
});

module.exports = router;
