var bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds.js");


// requireing routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true})); //what does this code mean?
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the DB

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Peluche was the best dog",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// pass in the local strategy node module
// User authenticate comes with passport local mongoose
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // comes with passport local mongoose
passport.deserializeUser(User.deserializeUser());

// this middleware allows us to pass the currentUser variable to every route
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next(); // executes the next line of code after the middleware
});

// first prefix is added before every route in the file
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(4000, function(){
  console.log("Serving it up~!")
})
