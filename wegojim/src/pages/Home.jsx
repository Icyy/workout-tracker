import { Button } from "@/components/ui/button";
import WorkOutCard from "@/components/workouts/WorkOutCard";
import { useState } from "react";

function Home() {
  const [workouts] = useState([
    {
      id: 1,
      day: "Upper Body",
      date: "2024-01-25",
      exercises: [
        { name: "Bench Press", weight: 185, reps: 10 },
        { name: "Shoulder Press", weight: 95, reps: 12 },
      ],
    },
    {
      id: 2,
      day: "Lower Body",
      date: "2024-01-26",
      exercises: [
        { name: "Squats", weight: 225, reps: 5 },
        { name: "Leg Press", weight: 135, reps: 8 },
      ],
    },
    {
      id: 3,
      day: "Core",
      date: "2024-01-27",
      exercises: [
        { name: "Crunches", weight: 225, reps: 5 },
        { name: "Leg Raises", weight: 135, reps: 8 },
      ],
    },
  ]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* workout cards */}
      <div className="flex flex-wrap justify-center w-full">
        {workouts.map((workout, index) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={index}>
            <WorkOutCard workouts={workout} index={index} page={workout.day} />
          </div>
        ))}
      </div>
      {/* ... */}

      {/* graph and add workout */}
      <div className="flex flex-col md:flex-row w-full mt-4">
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-gray-800 p-4 rounded-lg h-full">
            <h2 className="text-white text-lg font-semibold mb-2">Graphs</h2>
            {/* Graphs section */}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-green-600 p-4 rounded-lg h-full">
            {/* Render previous workouts if available */}
            {workouts.length > 0 ? (
              <>
                <div className="flex flex-row justify-between items-center mb-4">
                  <h2 className="text-white text-lg font-semibold">
                    Add Workout
                  </h2>
                  {/* Add Workout button */}
                  <div>
                    <Button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold">
                      Add Workout
                    </Button>
                  </div>
                </div>
                <h2 className="text-white text-lg font-semibold mb-2">
                  Previous Workouts
                </h2>
                <div>
                  {workouts.map((workout, index) => (
                    <div key={index}>
                      {/* Display each previous workout */}
                      <p>{workout.day}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // Render Add Workout button in the middle if no previous workouts
              <div className="flex justify-center">
                <Button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold">
                  Add Workout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ... */}
    </div>
  );
}

export default Home;
