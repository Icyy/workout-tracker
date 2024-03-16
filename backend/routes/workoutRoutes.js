// routes/workoutRoutes.js

const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");

router.get("/getworkouts", workoutController.getWorkouts);
router.post("/workouts", workoutController.createOrUpdateWorkout);

module.exports = router;
