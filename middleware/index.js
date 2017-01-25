var Campground = require("../models/campground");
var Comment = require("../models/comment")

// All middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash("error", "Campground not found")
        res.redirect("back");
      } else {
        // does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          // the equals method built in mongoose is used due to
          // foundCampground.author.id being an object and req.user._id being a string
          // yes? run code
          next(); // this executes the next function in the route handler
        } else {
          // no? redirect
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    // if not, redirect
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        // does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          // the equals method built in mongoose is used due to
          // foundComment.author.id being an object and req.user._id being a string
          // yes? run code
          next(); // this executes the next function in the route handler
        } else {
          // no? redirect
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    // if not, redirect
    req.flash("You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that")
  res.redirect("/login");
};


module.exports = middlewareObj;
