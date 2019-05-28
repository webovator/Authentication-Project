const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const app = express();
const date = require(__dirname + "/date.js");
console.log(date.getDay());

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
app.set('view engine', 'ejs');
app.set('view options', {
  delimiter: '%'
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  const day = date.getDay();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  console.log(req.body);
  const item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }


});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
