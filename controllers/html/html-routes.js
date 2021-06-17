const router = require('express').Router();
const path = require("path");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// GET all galleries for homepage
router.get("/", (req, res) => {
  console.log("GET /");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

router.get("/login", (req, res) => {
  console.log("GET /login");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

router.get("/logout", (req, res) => {
  console.log("GET /logout");
  // If the user already has an account send them to the members page
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

router.get("/signup", (req, res) => {
  console.log("GET /login");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../../public/signup.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, (req, res) => {
  console.log("GET /members");
  // console.trace();
  res.sendFile(path.join(__dirname, "../../public/members.html"));
});

module.exports = router;
