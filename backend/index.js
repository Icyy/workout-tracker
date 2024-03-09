
const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/workoutmodel");
const cors = require("cors");
const User = require("./models/user");
const app = express();
app.use(express.json());
const port = 3000;

const uri =
  "mongodb+srv://icyyfawkes:Y5IH3O1clPS2Uz6u@wegojim.uwgtxxd.mongodb.net/?retryWrites=true&w=majority&appName=wegojim";

app.use(cors());


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database!");
    // Start the server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Define a route to fetch all workouts
app.get("/getworkouts", async (req, res) => {
  try {
    // Fetch all workouts from the database
    const workouts = await Workout.find();
    res.status(200).json(workouts); // Return the workouts as JSON response
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Example route to create a new workout
app.post("/workouts", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Log received request body
    const { userId, workoutName, date, exercises } = req.body;
    const workout = new Workout({ userId, workoutName, date, exercises });
    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Other routes and middleware can be defined here


//login and register routes

app.post("/api/register", async (req,res)=>{
  console.log(req.body);
  try {
    await User.create({
      username : req.body.username,
      email : req.body.email,
      password: req.body.password
    })
    res.json({status:"ok"})
  } catch (error) {
    res.json({status:"error",error:error})
  }
  
})

app.post("/api/login", async (req,res)=>{
  console.log(req.body);
  try {
    const user = await User.findOne({
      email : req.body.email,
      password: req.body.password
    })
    if(user){
      res.json({status:"ok", userLoggedIn:true, email:user.email, userId: user._id,})
    }else{
      res.json({status:"Error: User not found", user:false})
    }
    
  } catch (error) {
    res.json({status:"error",error:error})
  }
  
})