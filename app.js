const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;

const indexRouter = require("./routes/index");
const translateRouter = require("./routes/translate");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/translate\/api/]));
app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "apidoc")));

app.use("/", indexRouter);
app.use("/translate", translateRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// HTTP Traffic
// app.listen(process.env.PORT || 8080, function () {});

module.exports = app;
