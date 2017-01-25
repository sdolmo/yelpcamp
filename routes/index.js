var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// Root Route
router.get("/", function(req, res){
  res.render("landing")
});

// ==============
// AUTH ROUTES
// ==============

// show register form
router.get("/register", function(req, res){
  res.render("register");
});

// handeling user sign up
router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  // the .register method is provided by the passport-local-mongoose module
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      return res.render("register", {"error": err.message});
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// ==============
// LOGIN
// ==============
// show login form
router.get("/login", function(req, res){
  res.render("login");
});

// handeling user login
// the second argument in post is a middelware and the same passport.auth in the register route
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res){
});

// ==============
// LOGOUT
// ==============
// logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You logged out")
  res.redirect("/campgrounds")
})

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
