

import WorkOutCard from "@/components/workouts/WorkOutCard";
import { useState } from "react";

function Home() {
  const [workouts] = useState([
    {
      id: 1,
      day: "Push",
      date: "2024-01-25",
      exercises: [
        { name: "Bench Press", weight: 185, reps: 10 },
        { name: "Shoulder Press", weight: 95, reps: 12 },
      ],
    },
    {
      id: 2,
      day: "Pull",
      date: "2024-01-26",
      exercises: [
        { name: "Deadlifts", weight: 225, reps: 5 },
        { name: "Bent Over Rows", weight: 135, reps: 8 },
      ],
    },
    {
      id: 3,
      day: "Legs",
      date: "2024-01-27",
      exercises: [
        { name: "Squats", weight: 225, reps: 5 },
        { name: "Leg Press", weight: 135, reps: 8 },
      ],
    },
    
  ]);

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex flex-col">
        <h1 className="ml-5 mb-7 font-extrabold text-5xl">
          <p>We Go Jim!</p>
        </h1>
        <div className="flex flex-wrap justify-center">
          {workouts.map((workout, index) => (
            // <div
            //   key={index}
            //   className="relative flex flex-col m-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full md:w-80"
            // >
            //   <div className="p-6">
            //     <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            //       {workout.day}
            //     </h5>
            //     <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            //       {workout.exercises.map((exercise) => (
            //         <span key={exercise.name}>{exercise.name}, </span>
            //       ))}
            //     </p>
            //   </div>
            //   <div className="p-6 pt-0">
            //     <button
            //       className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            //       type="button"
            //     >
            //       See details
            //     </button>
            //   </div>
            // </div>
           <WorkOutCard workouts={workout} index={index} key={index} page={workout.day} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
