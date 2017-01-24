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
          // add username and id to comment
          comment.author.id = req.user.id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
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


// EDIT - display form to edit comment
// Comment Edit
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// UPDATE - post put request from edit page
// Comment Update
router.put("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCampground){
    if (err) {
      res.redirect("back");
    } else {
        res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY - Delete a comment
// Comment Destroy
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

function checkCommentOwnership(req, res, next) {
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
          res.redirect("back");
        }
      }
    });
  } else {
    // if not, redirect
    res.redirect("back");
  }
};



module.exports = router;
