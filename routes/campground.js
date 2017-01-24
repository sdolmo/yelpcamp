var express = require("express");
var router = express.Router(); //new instence of the express router
var Campground = require("../models/campground");

// INDEX - Display list of all campgrounds
router.get("/", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log("WHOA! THERE SEEMS TO BE A PROBLEM");
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
    }
  })
});

// CREATE - Add new campgrounds to DB
router.post("/", isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.img;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, description: desc, author: author};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newCamp) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      console.log(newCamp);
      res.redirect("/campgrounds")
    }
  })
});

// NEW - Display the form to make a new campground
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new")
});

// SHOW - Displays more info about one campground
router.get("/:id", function(req, res){
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err){
      console.log(err);
    } else {
      // Render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  })
});

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
