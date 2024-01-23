import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/functions";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signup from "./components/SignupForm";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateWorkout = () => {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles, goal });
    setWorkout(newWorkout);
  };

  const CommonLayout = () => {
    return (
      <>
        <Header />
        <Hero />
        <Generator
          poison={poison}
          setPoison={setPoison}
          muscles={muscles}
          setMuscles={setMuscles}
          goal={goal}
          setGoal={setGoal}
          updateWorkout={updateWorkout}
        />
        {workout && <Workout workout={workout} />}
      </>
    );
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Routes>
        <Route path="/" element={<CommonLayout />} />
        <Route
          path="/login"
          element={
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
