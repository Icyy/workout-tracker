import { Button } from "@/components/ui/button";
import {
  Dialog,
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


export function InputModal({ exercise, onClose }) {
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const handleSave = () => {
    // Here you can handle saving the sets and reps data
    console.log("Exercise:", exercise);
    console.log("Sets:", sets);
    console.log("Reps:", reps);

    // Close the modal
    onClose();
  };

  return (
    <Dialog>
    <DialogTrigger asChild>
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-3xl font-bold">Push Day</h1>
      </div>

      <div className="flex flex-wrap justify-center" >
        {pushExercises.map((exercise, index) => (
          <ExerciseCategory key={index} exercise={exercise} />
        ))}
      </div>
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
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    // <div>
    //   test
    //   <div>
    //     <Button onClick={handleSave}>Save</Button>

    //     <Button onClick={onClose} variant="outline">
    //       Cancel
    //     </Button>
    //   </div>
    // </div>
  );
}
