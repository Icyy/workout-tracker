import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { exercises } from "@/data/exercises";

const Push = () => {
  const pushExercises = exercises.push;
  const pullExercises = exercises.pull;
  const legsExercises = exercises.legs;
  return (
    <div className="flex flex-wrap justify-center">
      {pushExercises.map((exercise, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <div className="h-full flex justify-center items-center">
            <Card className="bg-slate-900 text-white w-full">
              <CardHeader>
                <CardTitle>{exercise}</CardTitle>
                <CardDescription>
                  <p className="block font-sans text-white text-base antialiased font-light leading-relaxed text-inherit">
                    Log set
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Push;
