import { Button } from "@/components/ui/button";
import WorkOutCard from "@/components/workouts/WorkOutCard";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import useAuthStore from "@/stores/authStore";
import axios from "axios";

function Home() {
  const [workoutName, setWorkoutName] = useState("");
  const [date, setDate] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [workoutOptions, setWorkoutOptions] = useState([]);
  // const [data, setData] = useState({
  //   userId: userId,
  //   workoutName: null,
  //   date: null,
  //   exercises: [
  //     {
  //       exerciseName: null,
  //       weight: null,
  //       sets: null,
  //       reps: null,
  //     },
  //   ],
  // });

  useEffect(()=>{
    const fetchWorkoutNames = async()=>{
      try {
        // Send the request with the captured data
        const response = await axios.get(
          "http://localhost:3000/api/getworkoutname",
        );
        console.log(response.data);
        const workoutNames = response.data;
      // Set the fetched workout names in the state
      setWorkoutOptions(workoutNames);
      } catch (error) {
        console.error("Error fetching workout:", error);
      }

    }
    fetchWorkoutNames();
  },[])

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(false); // Close the dialog

    // Capture the latest state values
    const requestData = {
      userId,
      workoutName,
      date,
      exercises: [
        {
          exerciseName,
          weight,
          sets,
          reps,
        },
      ],
    };

    try {
      // Send the request with the captured data
      const response = await axios.post(
        "http://localhost:3000/api/workouts",
        requestData
      );
      console.log(response.data);

      // Reset form fields after successful submission
      setWorkoutName("");
      setDate("");
      setExerciseName("");
      setWeight("");
      setWorkoutName("");
      setSets("");
      setReps("");
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setWorkoutName("");
    setDate("");
    setExerciseName("");
    setWeight("");
    setWorkoutName("");
    setSets("");
    setReps("");
  };

  const handleAddNewWorkout = () => {
    // Save the new workout name to the database or perform any necessary action
    console.log("New workout name:", newWorkoutName);
    setWorkoutOptions(prevOptions => [...prevOptions, newWorkoutName]);

    // Set the newly added workout name as the selected option
    setWorkoutName(newWorkoutName);
  };


  // const clrState = ()=>{
  //   setWorkoutName("");
  //   setDate("");
  //   setExerciseName("");
  //   setWeight("");
  //   setSets("");
  //   setReps("");
  // }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap justify-center w-full">
        {workouts.map((workout, index) => (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={index}>
            <WorkOutCard workouts={workout} index={index} page={workout.day} />
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row w-full mt-4">
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-gray-800 p-4 rounded-lg h-full">
            <h2 className="text-white text-lg font-semibold mb-2">Graphs</h2>
            {/* Graphs section */}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-green-600 p-4 rounded-lg h-full">
            {workouts.length > 0 ? (
              <>
                <div className="flex flex-col items-center justify-center ">
                  <Dialog
                    open={isOpen}
                    onOpenChange={() => {
                      setIsOpen;
                    }}
                    className="h-100 overflow-y-scroll"
                  >
                    <DialogTrigger>
                      <Button
                        className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold"
                        onClick={() => setIsOpen(true)}
                      >
                        Add Workout
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] h-[400px] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add Workout</DialogTitle>
                        <DialogDescription>
                          Please enter workout details.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="mt-4 flex justify-center">
                            <div className="flex flex-col">
                              <Label>Date</Label>
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Workout Name</Label>
                            <select
                              value={workoutName}
                              onChange={(e) => setWorkoutName(e.target.value)}
                              required
                            >
                              <option value="" disabled>
                                Select a workout
                              </option>
                              {workoutOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                              {/* Option with the button to add a new workout name */}
                              <option value="__addNew__">
                                + Add New Workout
                              </option>
                            </select>
                            {/* Render input field when the "__addNew__" option is selected */}
                            {workoutName === "__addNew__" && (
                              <Input
                                placeholder="Enter New Workout Name"
                                value={newWorkoutName}
                                onChange={(e) =>
                                  setNewWorkoutName(e.target.value)
                                }
                                onBlur={() => handleAddNewWorkout()}
                              />
                            )}
                          </div>
                          {date && workoutName && (
                            <>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label>Exercise Name</Label>
                                <Input
                                  value={exerciseName}
                                  onChange={(e) =>
                                    setExerciseName(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label>Weight (kgs)</Label>
                                <Input
                                  type="number"
                                  value={weight}
                                  onChange={(e) => setWeight(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label>Sets</Label>
                                <Input
                                  type="number"
                                  value={sets}
                                  onChange={(e) => setSets(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label>Reps</Label>
                                <Input
                                  type="number"
                                  value={reps}
                                  onChange={(e) => setReps(e.target.value)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit</Button>
                          <DialogClose onClick={handleClose}>
                            Cancel
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <h2 className="text-white text-lg font-semibold mb-2">
                  Previous Workouts
                </h2>
                <div>
                  {workouts.map((workout, index) => (
                    <div key={index}>
                      <p>{workout.day}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold">
                  Add Workout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
