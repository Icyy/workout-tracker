const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  workoutName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    exerciseName: String,
    sets: Number,
    reps: Number,
    weight: Number
  }]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
