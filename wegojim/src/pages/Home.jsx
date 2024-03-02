import { Button } from "@/components/ui/button";
import WorkOutCard from "@/components/workouts/WorkOutCard";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
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

function Home() {
  const [workoutName, setWorkoutName] = useState("");
  const [date, setDate] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  // const [isOpen, setOpen] = useState(false);
  // const [exercises, setExercises] = useState([]);
  const [data, setData] = useState({
    workoutName: "",
    date: "",
    exercises: [
      {
        exerciseName: "",
        weight: "",
        sets: "",
        reps: "",
      },
    ],
  });

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

  const onSubmit = () => {
    // Update the exercises array with the entered exercise details
    console.log("calleds")
    setData((prevData) => ({
      ...prevData,
      workoutName,
      date,
      exercises: [
        ...prevData.exercises,
        {
          exerciseName,
          weight,
          sets,
          reps,
        },
      ],
    }));
    console.log(data);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
                    <Dialog>
                      <DialogTrigger asChild>
                        {/* <ExerciseCategory key={index} exercise={exercise} /> */}
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                          <div className="h-full flex justify-center items-center">
                            <Button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold">
                              Add Workout
                            </Button>
                          </div>
                          {/* {isOpen && <InputModal exercise={exercise} onClose={() => setIsOpen(false)} />} */}
                        </div>
                      </DialogTrigger>
                      <form onSubmit={onSubmit}>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Add Set & Reps</DialogTitle>
                            <DialogDescription>
                              Enter the number of sets and reps for .
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {/* Date picker */}
                            <div className="mt-4 flex justify-center">
                              <div className="flex flex-col">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant={"outline"} className="">
                                      {date ? (
                                        format(date, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={date}
                                      onSelect={setDate}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>

                            {/* workout Name */}
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="workoutName"
                                className="text-right"
                              >
                                Workout Name
                              </Label>
                              <Input
                                id="workoutName"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.target.value)}
                                className="col-span-3"
                              />
                            </div>

                            {/* Rendering after date and name is selected */}
                            {workoutName && date && (
                              <div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="exerciseName"
                                    className="text-right"
                                  >
                                    Exercise Name
                                  </Label>
                                  <Input
                                    id="exerciseName"
                                    value={exerciseName}
                                    onChange={(e) =>
                                      setExerciseName(e.target.value)
                                    }
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="weight"
                                    className="text-right"
                                  >
                                    Weight
                                  </Label>
                                  <Input
                                    id="weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="sets" className="text-right">
                                    Sets
                                  </Label>
                                  <Input
                                    id="sets"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="reps" className="text-right">
                                    Reps
                                  </Label>
                                  <Input
                                    id="reps"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="submit" onSubmit={onSubmit}>
                                Save
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>
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
