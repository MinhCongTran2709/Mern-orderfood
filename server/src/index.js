const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const app = express();
const route = require("./routes");
const db = require("./config");
const cors = require("cors");
//const session = require("express-session");

//Connect to DB
db.connect();

const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limmit: "2mb" }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(methodOverride("_method"));
//app.use(session({ secret: "SECRET" }));

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
