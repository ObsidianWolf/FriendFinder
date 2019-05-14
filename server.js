// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sets up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

app.use(express.static("app/public"));

// add the application routes
require(path.join(__dirname, './app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});