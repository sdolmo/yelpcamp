var express = require("express");
var router = express.Router(); //new instence of the express router
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res){
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
      res.redirect("/campgrounds")
    }
  })
});

// NEW - Display the form to make a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
  // is user logged in
  // if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        res.redirect("/campgrounds")
      } else {
        // does user own the campground?
        // if (foundCampground.author.id.equals(req.user._id)) {
          // yes? run code
          res.render("campgrounds/edit", {campground: foundCampground});
        // } else {
          // no? redirect
          // res.send("You are not authorized to do that!");
        // }
      }
    });
  // } else {
    // if not, redirect
    // console.log("log in first");
    // res.send("YOU NEED TO LOG IN")
  // }
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  // find and update correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      res.redirect("/campgrounds");
    } else {
      // redirect to show page
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;
