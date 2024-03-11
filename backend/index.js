
const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/workoutmodel");
const cors = require("cors");
const User = require("./models/user");
const app = express();
const jwt = require("express-jwt");
const bcrypt = require("bcrypt");
const jwksRsa = require('jwks-rsa');

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
app.get("/api/getworkouts", async (req, res) => {
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
app.post("/api/workouts", async (req, res) => {
  try {
    const { userId, workoutName, date, exercises } = req.body;

    // Check if there's an existing workout for the given userId, date, and workoutName
    let existingWorkout = await Workout.findOne({ userId, date, workoutName });

    if (existingWorkout) {
      // If workout exists, push the new exercises into the existing exercises array
      existingWorkout.exercises.push(...exercises);
      // Save the updated workout
      await existingWorkout.save();
      res.status(200).json({ message: "Workout updated successfully" });
    } else {
      // If no workout exists, create a new workout object and save it
      const newWorkout = new Workout({ userId, workoutName, date, exercises });
      await newWorkout.save();
      res.status(201).json({ message: "New workout created successfully" });
    }
  } catch (error) {
    console.error("Error creating/updating workout:", error);
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

// Secret key for JWT signing
// const secretKey = "your-secret-key";

// Middleware to authenticate requests with JWT
const authenticateJWT = jwt({
  // Dynamically provide a signing key based on the `kid` in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://your-auth0-domain/.well-known/jwks.json`, // Replace with your Auth0 domain
  }),

  // Validate the audience and the issuer.
  audience: 'your-audience', // Replace with your JWT audience
  issuer: `https://your-auth0-domain/`, // Replace with your Auth0 domain
  algorithms: ['RS256'], // Specify the algorithm used to sign the JWT
});

// Endpoint for user login
app.post("/api/login", async (req, res) => {
  try {
    // Retrieve user from the database by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // If user is not found, return error
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      // If passwords do not match, return error
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token with user information
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secretKey,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token and user information
    res.json({ token, userId: user._id, email: user.email });
  } catch (error) {
    // Handle server errors
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example protected endpoint
app.get("/api/protected", authenticateJWT, (req, res) => {
  // If JWT is valid, the user is authenticated
  res.json({ message: "You are authenticated" });
});
