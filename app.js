var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true})); //what does this code mean?
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Populate DB with some Campgrounds
// Campground.create({
//   name: "Bear Mountain",
//   image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
//   description: "CAUTION: There are bears wondering about; Brown bears, Black bears, Grizzly bears, even Polar Bears!"
// }, function(err, campground){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("NEWLY CREATED CAMPGROUND: ");
//     console.log(campground);
//   }
// });

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
      res.render("index", {campgrounds: allCampgrounds})
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
  res.render("new")
});

// SHOW - Displays more info about one campground
app.get("/campgrounds/:id", function(req, res){
  // Find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err){
      console.log(err);
    } else {
      // Render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  })
});

app.listen(4000, function(){
  console.log("Serving it up~!")
})
