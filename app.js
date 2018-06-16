const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routes/ApiRouter");
const authRouter = require("./routes/authRouter");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./configue/keys");
require("./utils/passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use(function(err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  console.log(err);
  res.status(err.statusCode).json({ message: "internal server error" });
});
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static("view/build"));
  app.get("*", (req, res, next) => {
    console.log(err);
    res.sendfile(path.resolve(__dirname, "view", "build", "index.js"));
  });
}

module.exports = app;
