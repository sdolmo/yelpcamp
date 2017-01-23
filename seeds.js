var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Bear Mountain",
    image: "http://www.theparentreport.com/wp-content/uploads/2012/02/2-396_camping_bear_tent_sf_fl.jpg",
    description: "CAUTION: There are Bears on this mountain"
  },
  {
    name: "Camp Deer Park",
    image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg",
    description: "blah, blah, blah"
  },
  {
    name: "Lake Laugai",
    image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
    description: "blah, blah, blah"
  }
]

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");
    // add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          // create a comment
          Comment.create(
            {
              text: "this place is great, but I wish there was internet",
              author: "Homer"
            }, function(err, comment){
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            });
        }
      });
    });
  });
  // add a few comments
}

module.exports = seedDB;
