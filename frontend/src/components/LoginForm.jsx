import React, { useState } from "react";
import loginService from "../services/login";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = (props) => {
  const { username, setUsername, password, setPassword, onLogin } = props;
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      // Handle successful login (e.g., redirect, show success message)
      console.log("User logged in:", user);
      onLogin();
      navigate("/dashboard");
    } catch (error) {
      // Handle login error (e.g., show error message)
      console.error("Login failed:", error.message);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Header />
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 w-32 h-32 rounded-full -translate-x-[40px]"></div>
          <div className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-400 to-purple-600 w-24 h-24 rounded-full"></div>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-opacity-25 bg-gray-800 p-8 rounded-lg backdrop-blur-md border-2 border-white"
        >
          <h3 className="text-white text-3xl font-semibold mb-8 text-center">
            Login Here
          </h3>

          <label
            className="block text-white text-sm font-semibold"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="block w-full h-12 bg-opacity-25 bg-white rounded-md px-3 mt-1 text-white text-sm font-normal"
            type="text"
            id="username"
            placeholder="Email or name"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label
            className="block text-white text-sm font-semibold mt-4"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="block w-full h-12 bg-opacity-25 bg-white rounded-md px-3 mt-1 text-white text-sm font-normal"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="mt-6 w-[90px] bg-white text-gray-800 py-3 rounded-md text-lg font-semibold cursor-pointer">
            Log In
          </button>
          <button
            onClick={handleSignupClick}
            className="mt-6 w-[90px] bg-white text-gray-800 py-3 rounded-xl text-lg font-semibold cursor-pointer ml-5"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
