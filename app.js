var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing")
})

app.get("/campgrounds", function(re1, res){
  var campgrounds = [
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
    {name: "Camp Deer Park", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
    {name: "Bear Mountain", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"}
  ]
  res.render("campgrounds", {campgrounds: campgrounds})
});

app.listen(3000, function(){
  console.log("Serving it up~!")
})
