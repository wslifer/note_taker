const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const apiRoutes = require("./routes/apiRoutes")(app);
const htmlRoutes = require("./routes/htmlRoutes")(app);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on PORT: ${PORT}`);
});
