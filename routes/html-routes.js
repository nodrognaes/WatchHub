// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(axios) {
  axios.get("/", (req, res) => {
    console.log("GET /");
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  axios.get("/login", (req, res) => {
    console.log("GET /login");
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  axios.get("/members", isAuthenticated, (req, res) => {
    console.log("GET /members");
    // console.trace();
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
