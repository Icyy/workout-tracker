const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://icyyfawkes:Y5IH3O1clPS2Uz6u@wegojim.uwgtxxd.mongodb.net/?retryWrites=true&w=majority&appName=wegojim";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.use("/api", workoutRoutes);
app.use("/api", authRoutes);
