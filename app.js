var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); //what does this code mean?
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
  {name: "Camp Deer Park", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
  {name: "Bear Mountain", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
  {name: "Camp Deer Park", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
  {name: "Bear Mountain", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
  {name: "Camp Deer Park", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
  {name: "Bear Mountain", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"}
];

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds})
});

app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.img;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect("/campgrounds")
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs")
});

app.listen(4000, function(){
  console.log("Serving it up~!")
})
