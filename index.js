require("dotenv").config();
require("./discordclient");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.use("/", require("./routes/index"));

app.get("*", (req, res) => {
  res.redirect("/error");
});
app.post("*", (req, res) => {
  res.redirect("/error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening to the port ${PORT}.`)
);
