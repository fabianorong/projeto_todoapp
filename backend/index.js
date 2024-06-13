const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();

dotenv.config({ path: "./config.env" });

// Config JSON response
app.use(express.json());

// Solve CORS
// app.use(cors({ credentials: true, origin: "http://localhost/3000" }));
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  next();
};
app.use(allowCrossDomain);

// Public folder for images
app.use(express.static("public"));

// Routes
const UserRoutes = require("./routes/UserRoutes");
const TaskRoutes = require("./routes/TaskRoutes");

app.use("/users", UserRoutes);
app.use("/tasks", TaskRoutes);

app.listen(5000, () => {
  console.log("Server started");
});
