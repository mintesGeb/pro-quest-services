var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
const authController = require("./controller/auth");
const fs=require("file-system")

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var servicesRouter = require("./routes/services");

let mongoose = require("mongoose");
const { fstat } = require("fs");
let mongoDB_URI =
  "mongodb+srv://mintes:123@cluster0.jbldm.mongodb.net/ServiceApp?retryWrites=true&w=majority";
mongoose.connect(mongoDB_URI || "mongodb://localhost/serviceApp");
var app = express();

// view engine setup

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users",usersRouter);
app.use("/services",authController.authorize, servicesRouter);
// app.all('*', async(req,res)=>{
//   fs.createReadStream("../give-recieve-service-app-Frontend/index.html").pipe(res)
// }

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:err})
  // res.render("error");
});

// module.exports = app;
app.listen(1211);
