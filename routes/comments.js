var express = require("express");
var router = express.Router({mergeParams: true}); //this merges the params from the campground and the comment routes
var Campground = require("../models/campground"); // this allows the :id routes to be used in the app.js file
var Comment = require("../models/comment");

// ==========================
// COMMENT ROUTES
// ==========================

// NEW - Display form to create a new comment
// Comments New
router.get("/new", isLoggedIn, function(req, res){
  // find campground by id
  console.log(req.params.id);
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new commentw
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  });
});

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
