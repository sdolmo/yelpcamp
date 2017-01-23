var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express(),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds.js");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true})); //what does this code mean?
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
  res.render("landing")
});

// INDEX - Display list of all campgrounds
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log("WHOA! THERE SEEMS TO BE A PROBLEM");
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds})
    }
  })
});

// CREATE - Add new campgrounds to DB
app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.img;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
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
app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new")
});

// SHOW - Displays more info about one campground
app.get("/campgrounds/:id", function(req, res){
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

// ==========================
// COMMENT ROUTES
// ==========================

// NEW - Display form to create a new comment
app.get("/campgrounds/:id/comments/new", function(req, res){
  // find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
});

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(4000, function(){
  console.log("Serving it up~!")
})
