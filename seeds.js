var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Bear Mountain",
    image: "http://www.theparentreport.com/wp-content/uploads/2012/02/2-396_camping_bear_tent_sf_fl.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper mauris tortor, non finibus tortor consectetur pellentesque. Aliquam sagittis vulputate tortor, sit amet finibus augue faucibus vel. Pellentesque gravida tempor urna, a dignissim leo vehicula volutpat. Maecenas non orci luctus, ultricies lorem id, mattis tellus. Integer purus ante, vestibulum at leo vel, aliquet dignissim augue. Vestibulum augue odio, eleifend eu tellus sed, blandit dictum eros. Etiam non vestibulum arcu. Sed ultrices neque non nibh hendrerit, vel cursus urna condimentum. Mauris venenatis mauris nec orci efficitur tempus. Etiam facilisis purus vel sollicitudin rhoncus. Phasellus accumsan posuere nisl vitae hendrerit. Nullam placerat volutpat rutrum. Nam tincidunt orci leo, ac sollicitudin urna consequat eget. Nullam imperdiet vulputate dapibus. Pellentesque sagittis scelerisque urna ut congue."
  },
  {
    name: "Camp Deer Park",
    image: "http://gazettereview.com/wp-content/uploads/2016/02/Camping1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper mauris tortor, non finibus tortor consectetur pellentesque. Aliquam sagittis vulputate tortor, sit amet finibus augue faucibus vel. Pellentesque gravida tempor urna, a dignissim leo vehicula volutpat. Maecenas non orci luctus, ultricies lorem id, mattis tellus. Integer purus ante, vestibulum at leo vel, aliquet dignissim augue. Vestibulum augue odio, eleifend eu tellus sed, blandit dictum eros. Etiam non vestibulum arcu. Sed ultrices neque non nibh hendrerit, vel cursus urna condimentum. Mauris venenatis mauris nec orci efficitur tempus. Etiam facilisis purus vel sollicitudin rhoncus. Phasellus accumsan posuere nisl vitae hendrerit. Nullam placerat volutpat rutrum. Nam tincidunt orci leo, ac sollicitudin urna consequat eget. Nullam imperdiet vulputate dapibus. Pellentesque sagittis scelerisque urna ut congue."
  },
  {
    name: "Lake Laugai",
    image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper mauris tortor, non finibus tortor consectetur pellentesque. Aliquam sagittis vulputate tortor, sit amet finibus augue faucibus vel. Pellentesque gravida tempor urna, a dignissim leo vehicula volutpat. Maecenas non orci luctus, ultricies lorem id, mattis tellus. Integer purus ante, vestibulum at leo vel, aliquet dignissim augue. Vestibulum augue odio, eleifend eu tellus sed, blandit dictum eros. Etiam non vestibulum arcu. Sed ultrices neque non nibh hendrerit, vel cursus urna condimentum. Mauris venenatis mauris nec orci efficitur tempus. Etiam facilisis purus vel sollicitudin rhoncus. Phasellus accumsan posuere nisl vitae hendrerit. Nullam placerat volutpat rutrum. Nam tincidunt orci leo, ac sollicitudin urna consequat eget. Nullam imperdiet vulputate dapibus. Pellentesque sagittis scelerisque urna ut congue."
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
