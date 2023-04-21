const express = require("express");
const app = express();
const port = 3000;
const restaurantsList = require("./restaurant.json");

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantsList.results });
});

app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantsList.results.find(
    (rest) => rest.id.toString() === req.params.id[0]
  );
  res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const search_restaurant = restaurantsList.results.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  );
  res.render("index", {
    restaurants: search_restaurant,
    keyword: req.query.keyword,
  });
});

app.listen(port);
