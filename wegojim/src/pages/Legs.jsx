import { exercises } from "@/data/exercises";
// import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Legs = () => {
  const legExercises = exercises.legs;
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const onSubmit = ()=>{
    setSets("");
    setReps("");
    setWeight("");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Leg Day</h1>
      </div>

      <div className="flex flex-wrap justify-center">
        {legExercises.map((exercise, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              {/* <ExerciseCategory key={index} exercise={exercise} /> */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <div className="h-full flex justify-center items-center">
                  <div
                    className="bg-slate-900 text-white w-full h-full p-4 rounded-md cursor-pointer"
                    //   onClick={handleOpenModal}
                  >
                    <h3 className="text-lg font-semibold mb-2">{exercise}</h3>
                    <p className="text-sm text-gray-300">
                      Click to add set & reps
                    </p>
                  </div>
                </div>
                {/* {isOpen && <InputModal exercise={exercise} onClose={() => setIsOpen(false)} />} */}
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Set & Reps</DialogTitle>
                <DialogDescription>
                  Enter the number of sets and reps for {exercise}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sets" className="text-right">
                    Weight
                  </Label>
                  <Input
                    id="sets"
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button type='submit' onClick={onSubmit}>Save</Button>
                  {/* <Button variant="outline">
                    Cancel
                  </Button> */}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Legs;
