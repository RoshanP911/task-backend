const express = require('express');
const app = express();
const logger = require("morgan");
const cors = require("cors");
app.use(logger("dev"));

const userRoute = require('./route/userRoute.js');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/', userRoute);


//To connect MongoDB
const dbConnect = require("./config/mongodb.js");
dbConnect();


//Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
