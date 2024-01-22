import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";

const Workout = ({ workout }) => {
  return (
    <SectionWrapper id={"workout"} header={"welcome to"} title={"THE WORKOUT"}>
      <div className="flex flex-col gap-4">
        {workout.map((exercise, i) => {
          return <ExerciseCard i={i} exercise={exercise} key={i} />;
        })}
      </div>
    </SectionWrapper>
  );
};

export default Workout;
