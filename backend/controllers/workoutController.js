const Workout = require("../models/workoutmodel");

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createOrUpdateWorkout = async (req, res) => {
  try {
    const { userId, workoutName, date, exercises } = req.body;

    // Standardize the workout name by converting it to lowercase
    const standardizedWorkoutName = workoutName.toLowerCase();

    // Check if there's an existing workout for the given userId, date, and standardized workoutName
    let existingWorkout = await Workout.findOne({ userId, date, workoutName: standardizedWorkoutName });

    if (existingWorkout) {
      // If workout exists, push the new exercises into the existing exercises array
      existingWorkout.exercises.push(...exercises);
      // Save the updated workout
      await existingWorkout.save();
      res.status(200).json({ message: "Workout updated successfully" });
    } else {
      // If no workout exists, create a new workout object with standardized workoutName and save it
      const newWorkout = new Workout({ userId, workoutName: standardizedWorkoutName, date, exercises });
      await newWorkout.save();
      res.status(201).json({ message: "New workout created successfully" });
    }
  } catch (error) {
    console.error("Error creating/updating workout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
