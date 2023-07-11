const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./Routes/authRoute'); 
const cors = require('cors');
const app = express();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Routing Middlewares
app.use("/api/",authRoutes);

//Server Creation
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT,'192.168.0.100',() => {
     console.log(`Running Server on port: ${PORT}`);
      console.log("MongoDB Connected!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
