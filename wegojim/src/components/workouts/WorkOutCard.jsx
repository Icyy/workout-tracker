import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const WorkOutCard = ({ workouts, index, page }) => {
    
  return (
    <Link to={`/${page}`}>
      <div className="m-3">
         <Card key={index}>
              <CardHeader>
                <CardTitle>{workouts.day}</CardTitle>
                <CardDescription>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    {workouts.exercises.map((exercise) => (
                      <span key={exercise.name}>{exercise.name}, </span>
                    ))}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
      </div>
      </Link>  
  );
}

export default WorkOutCard