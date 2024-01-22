import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/workouts";

const Header = ({ index, title, description }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 justify-center">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-500">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
};

const Generator = () => {
  const [showModal, setShowModal] = useState(false);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strength_power");

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const updateMuscles = (muscleGroup) => {
    // this means that we got a type of individual and the muscles are already included
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 3) {
      setShowModal(false);
    }
  };

  return (
    <SectionWrapper
      header={"Generate your workout"}
      title={`It's time to get `}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => setPoison(type)}
              className={
                "bg-slate-950 border  duration-200 px-4 hover:border-purple-600 py-3 rounded-xl " +
                (type === poison ? " border-purple-900" : " border-purple-600")
              }
              key={typeIndex}
            >
              {/*type.replaceAll replaces the first term with the second term, bodybuilder_split with bodybuilder split  */}
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles you wish to destroy"}
      />
      <div className="bg-slate-950 border border-solid border-purple-600 rounded-lg flex flex-col">
        <button
          onClick={handleModal}
          className="relative flex items-center justify-center p-3"
        >
          <p>Select muscle groups</p>
          <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
        </button>
        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  key={muscleGroupIndex}
                  className={
                    "hover:text-purple-600 duration-200 " +
                    (muscles.includes(muscleGroup) ? " text-purple-600" : " ")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become Batman, or Sam Sulek..."}
        description={"Select your ultimate objective"}
      />
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => setGoals(scheme)}
              className={
                "bg-slate-950 border  duration-200 px-4 hover:border-purple-600 py-3 rounded-xl " +
                (scheme === goals ? " border-purple-900" : " border-purple-600")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Generator;
