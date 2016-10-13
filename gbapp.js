var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();  // make express app
var server = require('http').createServer(app);
//app.get('/',function(req,res){
  //  res.send('Hello World');
//})
// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify our view engine
app.use(express.static(__dirname+'/views'));
//app.set('view engine','ejs');

// manage our entries
var entries = [];
app.locals.entries = entries;
// set up the logger
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
// GETS
app.get("/", function (request, response) {
  response.render("index");
});
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});
// POSTS
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("/");
});

// 404
app.use(function (request, response) {
  response.status(404).render("404");
});
// Listen for an application request on port 8081
server.listen(8081, function () {
  console.log('Guestbook app listening on http://127.0.0.1:8081/');
});
