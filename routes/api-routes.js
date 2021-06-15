// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require('axios')

module.exports = function(axios) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  axios.post("/api/login", passport.authenticate("local"), async (req, res) => {
    console.log("POST /api/login");
    // Testing Post and Favorite using req.user from login
    console.log("req.user.id", req.user.id);
    try {
      const result = await db.Post.create({
        // Case sensitive for 'UserId' foreign key
        UserId: req.user.id,
        title: "This is the title for this post",
        body: "This is the body of this post"
      });
      console.log("result", result.get({ plain:true }));

      const result2 = await db.Favorite.create({
        // Case sensitive for 'UserId' foreign key
        UserId: req.user.id,
        title: "This is the title for this favorite",
        body: "This is the body of this favorite"
      });
      console.log("result2", result2.get({ plain:true }));

      res.json({
        email: req.user.email,
        id: req.user.id
      });
    } catch (err) {
      console.log(err);
      res.status(401).json(err);
    }

    // .then(res => {
    //   console.log("db.Post.create", res);
    // })
    // .catch(err => {
    //   res.status(401).json(err);
    // });

    // db.Favorite.create({
    //   userId:  req.user.id,
    //   title: "This is the title for this post",
    //   body: "This is the body of this post"
    // })
    //   .then(res => {
    //     console.log("db.Favorite.create", res);
    //   })
    //   .catch(err => {
    //     res.status(401).json(err);
    //   });

    // Sending back a password, even a hashed password, isn't a good idea
    // res.json({
    //   email: req.user.email,
    //   id: req.user.id
    // });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  axios.post("/api/signup", (req, res) => {
    console.log("POST /api/signup");

    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login"); // 307: redirect with the same method
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  axios.get("/logout", (req, res) => {
    console.log("GET /logout")
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  axios.get("/api/user_data", (req, res) => {
    console.log("GET /api/user_data");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};